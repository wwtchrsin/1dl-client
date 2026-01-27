export default {
  "message": {
    "region": {
      "values": [
        "en",
        "ru"
      ],
      "pattern": "^(en|ru)$"
    },
    "district": {
      "min": 0,
      "max": 299
    },
    "room": {
      "min": 0,
      "max": 299
    },
    "index": {
      "min": 0,
      "max": 299
    },
    "text": {
      "minLen": 16,
      "maxLen": 128
    },
    "color": {
      "values": [
        "black",
        "red",
        "orange",
        "yellow",
        "green",
        "cyan",
        "blue",
        "purple",
        "pink"
      ]
    }
  },
  "user": {
    "login": {
      "minLen": 8,
      "maxLen": 16,
      "pattern": "^[A-Za-z0-9_-]{8,16}$"
    },
    "password": {
      "minLen": 8,
      "maxLen": 24,
      "pattern": "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*+=_-])[A-Za-z\\d!@#$%^&*+=_-]{8,24}$"
    },
    "name": {
      "minLen": 8,
      "maxLen": 16
    },
    "state": {
      "values": [
        "inactive",
        "active",
        "suspended"
      ]
    }
  },
  "session": {
    "sessionid": {
      "len": 128,
      "pattern": "^[0-9A-Fa-f]{128}$"
    }
  }
}