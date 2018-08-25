const axios = require('axios');

function getCourses(level, term, department) {
  axios
    .get(
      'https://cobalt.qas.im/api/1.0/courses/filter?q=level:' + level + '&term:' + term + '&department:' + department + '&key=RyvDnYdKxsblregFbObVQPtVdlN2CpQW',
    )
    .then(response => {
      console.log(response.data);
    });
}

getCourses("100", "2018 Fall", "Computer Science");
getCourses("200", "2017 Winter", "Computer Science");
getCourses("200", "2017 Fall", "Mathematics");
getCourses("300", "2017 Fall", "Mathematics");
