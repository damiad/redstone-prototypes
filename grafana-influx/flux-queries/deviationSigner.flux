import "strings"
import "join"

// todo: add this to Variables in grafana and remove the hardcoding
v = {timeRangeStart: -12h, timeRangeStop: -6h}
dataServiceId = "redstone-primary-prod" 
// dataServiceId = "${queryDataServiceId}"
// windowPeriod = duration(v: "${windowPeriod}")

windowPeriod = 3h

calculateDeviationPercentage = (value1, value2) => {
  return (value1 - value2) / value2 * 100.0
}

meanSignerStream = from(bucket: "redstone")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) =>
    r.dataServiceId == dataServiceId and
    r._measurement == "dataPackages" and
    r._field == "value" and
    r.dataFeedId != "___ALL_FEEDS___"
  )
  |> keep(columns: ["_time", "_value", "dataFeedId"])
  |> aggregateWindow(every: windowPeriod, fn: mean, createEmpty: false)
  |> keep(columns: ["_time", "_value", "dataFeedId"])
  |> group(columns: ["dataFeedId"])

signerStream = from(bucket: "redstone")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) =>
    r.dataServiceId == dataServiceId and
    r._measurement == "dataPackages" and
    r._field == "value" and
    r.dataFeedId != "___ALL_FEEDS___"
  )
  |> keep(columns: ["_time", "_value", "dataFeedId", "signerAddress"])
  |> aggregateWindow(every: windowPeriod, fn: mean, createEmpty: false)
  |> keep(columns: ["_time", "_value", "dataFeedId", "signerAddress"])
  |> group(columns: ["dataFeedId"])

joined = join.left(
  left: signerStream,
  right: meanSignerStream,
  on: (l,r) => l.dataFeedId == r.dataFeedId and l._time == r._time,
  as: (l,r) => ({
    _time: l._time, 
    _value: calculateDeviationPercentage(value1: l._value, value2: r._value),
    dataFeedId: l.dataFeedId,
    signerAddress: l.signerAddress
  })
)

joined
  |> group(columns: ["dataFeedId", "signerAddress"])
  |> yield(name: "deviationPercentage")
