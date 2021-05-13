A **very simple** DateTime library to convert timestamp to human readable time.

size: 1.31kb

Something I use all the time and don't want to repeat it all the time.

Usage:

Format _Date:_

```javascript
const simpleDatetimeFormater = require("simple-datetime-formater"

simpleDateTimeFormater.formatDate(timestamp)

```

Format _Time:_

```javascript
const simpleDatetimeFormater = require("simple-datetime-formater"

simpleDateTimeFormater.formatTime(timestamp)

```

`timestamp` or ISO time string parameter is optional. You can use it when necessary.

timeago

```javascript
const simpleDatetimeFormater = require("simple-datetime-formater"

simpleDateTimeFormater.formatTimeAgo(timestamp)

```

to use this package over in the frontend here is the cdn:

```html
<script src="https://cdn.jsdelivr.net/gh/rexeze/formatTimeStamp/src/index.min.js"></script>
```

In timeago you must put a time stamp or ISO time string.

This package solves my problem for now.
I will continue to develop it to something more robust to suit any use case if necessary.
