-- We could uncomment and use filtering by symbol instead of addresses on different chains but for now Dune has blank fields in it's datasets
-- More about dex.trades in query: 3118961
WITH 
    volume_24h as (
        SELECT blockchain, project, version, sum(amount_usd) as amount_usd_24h, CAST(project_contract_address as varchar) as project_contract_address
        FROM dex.trades
        WHERE block_time >= cast(now() as timestamp) - interval '1' day
        AND ( 0=1 -- Easier to edit
            -- OR (blockchain = 'polygon' AND (token_bought_address = 0x OR token_sold_address = 0x))
            -- OR (blockchain = 'base' AND (token_bought_address = 0xdd4ac477d7c98a1fca789efdb9c56b14e25bc35d OR token_sold_address = 0xdd4ac477d7c98a1fca789efdb9c56b14e25bc35d))
            OR (blockchain = 'ethereum' AND (token_bought_address = 0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5 OR token_sold_address = 0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5))
            -- OR (blockchain = 'optimism' AND (token_bought_address = 0x OR token_sold_address = 0x))
            OR (blockchain = 'bnb' AND (token_bought_address = 0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3 OR token_sold_address = 0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3))
            -- OR (blockchain = 'celo' AND (token_bought_address = 0xd629eb00deced2a080b7ec630ef6ac117e614f1b OR token_sold_address = 0xd629eb00deced2a080b7ec630ef6ac117e614f1b))
            -- OR (blockchain = 'avalanche_c' AND (token_bought_address = 0x OR token_sold_address = 0x))
            -- OR (blockchain = 'gnosis' AND (token_bought_address = 0x OR token_sold_address = 0x))
            -- OR (blockchain = 'arbitrum' AND (token_bought_address = 0xbc011a12da28e8f0f528d9ee5e7039e22f91cf18 OR token_sold_address = 0xbc011a12da28e8f0f528d9ee5e7039e22f91cf18))
            -- OR (blockchain = 'fantom' AND (token_bought_address = 0x OR token_sold_address = 0x))
        )
        -- AND (token_bought_symbol = '{{token_symbol}}' OR token_sold_symbol = '{{token_symbol}}')
        GROUP BY blockchain, project, version, project_contract_address
    )

    , volume_7d as (
        SELECT blockchain, project, version, sum(amount_usd) as amount_usd_7d, CAST(project_contract_address as varchar) as project_contract_address
        FROM dex.trades
        WHERE block_time >= cast(now() as timestamp) - interval '7' day
        AND (  0=1 -- Easier to edit
          -- OR (blockchain = 'polygon' AND (token_bought_address = 0x OR token_sold_address = 0x))
            -- OR (blockchain = 'base' AND (token_bought_address = 0xdd4ac477d7c98a1fca789efdb9c56b14e25bc35d OR token_sold_address = 0xdd4ac477d7c98a1fca789efdb9c56b14e25bc35d))
            OR (blockchain = 'ethereum' AND (token_bought_address = 0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5 OR token_sold_address = 0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5))
            -- OR (blockchain = 'optimism' AND (token_bought_address = 0x OR token_sold_address = 0x))
            OR (blockchain = 'bnb' AND (token_bought_address = 0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3 OR token_sold_address = 0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3))
            -- OR (blockchain = 'celo' AND (token_bought_address = 0xd629eb00deced2a080b7ec630ef6ac117e614f1b OR token_sold_address = 0xd629eb00deced2a080b7ec630ef6ac117e614f1b))
            -- OR (blockchain = 'avalanche_c' AND (token_bought_address = 0x OR token_sold_address = 0x))
            -- OR (blockchain = 'gnosis' AND (token_bought_address = 0x OR token_sold_address = 0x))
            -- OR (blockchain = 'arbitrum' AND (token_bought_address = 0xbc011a12da28e8f0f528d9ee5e7039e22f91cf18 OR token_sold_address = 0xbc011a12da28e8f0f528d9ee5e7039e22f91cf18))
            -- OR (blockchain = 'fantom' AND (token_bought_address = 0x OR token_sold_address = 0x))
        )
        -- AND (token_bought_symbol = '{{token_symbol}}' OR token_sold_symbol = '{{token_symbol}}')
        GROUP BY blockchain, project, version, project_contract_address
    )

SELECT 
    rank() OVER(ORDER BY "amount_usd_7d" DESC) AS rank,
    volume_7d.blockchain,
    volume_7d.project,
    volume_7d.version,
    CASE 
        WHEN "amount_usd_24h" IS NULL THEN 0
        ELSE "amount_usd_24h"
    END AS "24hs volume $", 
    CASE 
        WHEN "amount_usd_7d" IS NULL THEN 0
        ELSE "amount_usd_7d"
    END AS "7d volume $",
    volume_7d.project_contract_address
FROM volume_7d
LEFT JOIN volume_24h on volume_24h."project_contract_address" = volume_7d."project_contract_address" and volume_24h.blockchain = volume_7d.blockchain and volume_24h.project = volume_7d.project and volume_24h.version = volume_7d.version
ORDER BY rank ASC