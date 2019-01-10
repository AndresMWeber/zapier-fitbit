// get a list of activities
const listActivities = (z) => {
  const responsePromise = z.request({
    url: 'https://api.fitbit.com/1/user/-/activities/list.json?',
    params: {
      beforeDate: 'today',
      sort: 'desc',
      limit: 10,
      offset: 0,
    }
  });

  return responsePromise
    .then(response => {
      results = z.JSON.parse(response.content);
      results.activities.forEach(activity => {activity.id = activity.logId});
      results.activities.forEach(activity => {activity.activeSeconds = (activity.activeDuration / 1000).toFixed(2)});
      return results.activities;
    })
};

const sample = {
  "activities": [
    {
      "activeDuration": 3041000,
      "activityLevel": [
        {
          "minutes": 0,
          "name": "sedentary"
        },
        {
          "minutes": 1,
          "name": "lightly"
        },
        {
          "minutes": 3,
          "name": "fairly"
        },
        {
          "minutes": 46,
          "name": "very"
        }
      ],
      "activityName": "Elliptical",
      "activityTypeId": 20047,
      "averageHeartRate": 138,
      "calories": 612,
      "distance": 2.980554,
      "distanceUnit": "Kilometer",
      "duration": 3044000,
      "elevationGain": 32.004,
      "heartRateLink": "https://api.fitbit.com/1/user/-/activities/heart/date/2019-01-02/2019-01-02/1sec/time/20:33:57/21:24:41.json",
      "heartRateZones": [
        {
          "max": 93,
          "min": 30,
          "minutes": 1,
          "name": "Out of Range"
        },
        {
          "max": 130,
          "min": 93,
          "minutes": 17,
          "name": "Fat Burn"
        },
        {
          "max": 158,
          "min": 130,
          "minutes": 29,
          "name": "Cardio"
        },
        {
          "max": 220,
          "min": 158,
          "minutes": 4,
          "name": "Peak"
        }
      ],
      "lastModified": "2019-01-03T02:39:11.000Z",
      "id": 18976152280,
      "logType": "tracker",
      "manualValuesSpecified": {
        "calories": false,
        "distance": false,
        "steps": false
      },
      "originalDuration": 3044000,
      "originalStartTime": "2019-01-02T20:33:57.000-05:00",
      "source": {
        "id": "114314997",
        "name": "Ionic",
        "type": "tracker",
        "url": "https://www.fitbit.com/"
      },
      "speed": 3.528449852022361,
      "startTime": "2019-01-02T20:33:57.000-05:00",
      "steps": 3070,
      "tcxLink": "https://api.fitbit.com/1/user/-/activities/18976152280.tcx"
    },
    {
      "activeDuration": 1489000,
      "activityLevel": [
        {
          "minutes": 0,
          "name": "sedentary"
        },
        {
          "minutes": 0,
          "name": "lightly"
        },
        {
          "minutes": 0,
          "name": "fairly"
        },
        {
          "minutes": 25,
          "name": "very"
        }
      ],
      "activityName": "Run",
      "activityTypeId": 90009,
      "calories": 370,
      "distance": 4.988999,
      "distanceUnit": "Kilometer",
      "duration": 1489000,
      "elevationGain": 0,
      "lastModified": "2019-01-01T01:36:12.000Z",
      "id": 18882581955,
      "logType": "manual",
      "manualValuesSpecified": {
        "calories": false,
        "distance": true,
        "steps": false
      },
      "originalDuration": 1489000,
      "originalStartTime": "2018-12-31T17:26:38.000-05:00",
      "pace": 298.4566643529093,
      "source": {
        "id": "22997K",
        "name": "Fitbit + Strava",
        "type": "app",
        "url": "https://strava.fitbit.com/"
      },
      "speed": 12.062052652787106,
      "startTime": "2018-12-31T17:26:38.000-05:00",
      "steps": 4086
    }
  ],
  "pagination": {
    "beforeDate": "2019-01-03",
    "limit": 10,
    "next": "https://api.fitbit.com/1/user/-/activities/list.json?offset=10&limit=10&sort=desc&beforeDate=2019-01-03",
    "offset": 0,
    "previous": "",
    "sort": "desc"
  },
  "id": "2019-01-03",
}

module.exports = {
  key: 'activity',
  noun: 'Activity',
  list: {
    display: {
      label: 'New Activity',
      description: 'Lists the activities.'
    },
    operation: {
      sample: sample,
      outputFields: [
        { key: 'id', label: 'ID' },
        { key: "activeDuration", label: 'Activity Duration' },
        { key: "activeSeconds", label: 'Duration Active Minutes' },
        { key: "activityLevel", label: 'Activity Level' },
        { key: "activityName", label: 'Activity Name' },
        { key: "activityTypeId", label: 'Activity Type ID' },
        { key: "averageHeartRate", label: 'Average Heart Rate' },
        { key: "calories", label: 'Calories' },
        { key: "distance", label: 'Distance' },
        { key: "distanceUnit", label: 'Distance Unit' },
        { key: "duration", label: 'Duration' },
        { key: "elevationGain", label: 'Elevation Gain' },
        { key: "heartRateLink", label: 'Heart Rate Link' },
        { key: "heartRateZones", label: 'Heart Rate Zones' },
        { key: "lastModified", label: 'Last Modified' },
        { key: "logType", label: 'Log Type' },
        { key: "manualValuesSpecified", label: 'Manual Values' },
        { key: "originalDuration", label: 'Original Duration' },
        { key: "originalStartTime", label: 'Original Start Time' },
        { key: "source", label: 'Source' },
        { key: "speed", label: 'Speed' },
        { key: "startTime", label: 'Start Time' },
        { key: "steps", label: 'Steps' },
        { key: "tcxLink", label: 'URL' },
      ],
      perform: listActivities
    },
  },

};
