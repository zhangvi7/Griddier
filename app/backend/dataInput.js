// import $ from jquery;

import example from './example';

import PriorityQueue from './PriorityQueue';
import axios from 'axios';

const requiredCourses = [
  'CSC108',
  'CSC148',
  'CSC165',
  'MAT137',
  'MAT157',
  'MAT135',
  'MAT136',
];
const req1 =
  'https://cobalt.qas.im/api/1.0/courses/filter?key=RyvDnYdKxsblregFbObVQPtVdlN2CpQW&limit=100&q=code%3A%22CSC%22%20AND%20department%3A%22computer%20science%22%20AND%20term%3A%222018%20Fall%22%20OR%20term%3A%222019%20Winter%22%20';

export function fetchAllCourses() {
  const req = 'https://cobalt.qas.im/api/1.0/courses/filter?q=';
  const key = 'RyvDnYdKxsblregFbObVQPtVdlN2CpQW';

  axios.get(`${req}${key}`).then(response => {
    console.log(response.data);
  });

  // // url (required), options (optional)
  // fetch('https://cobalt.qas.im/api/1.0/courses/filter?q=code%3A%22CSC%22&key=RyvDnYdKxsblregFbObVQPtVdlN2CpQW&limit=100', {
  //   method: 'get'
  // }).then(function (response) {

  // }).catch(function (err) {
  //   // Error :(
  // });

  const filteredCourses = filterCourses('UTSG', 1, 2019, 'Computer Science', [
    'Mathematical and Computational Sciences',
    'Dept. of Computer & Mathematical Sci (UTSC)',
  ]);

  // 0 = all, 1 = early, 2 = late.
  buildTimeTable(filteredCourses, 0);
}

function filterCourses(
  selectedCampus,
  yearOfStudy,
  schoolYear,
  selectedDepartment,
  interests,
) {
  // console.log(example[0]);
  const filteredCourses = new PriorityQueue();

  for (let i = 0; i < example.length; i += 1) {
    const {
      id,
      code,
      name,
      description,
      division,
      department,
      prerequisites,
      exclusions,
      level,
      campus,
      term,
      meeting_sections,
      breadths,
      ,
    } = example[i];

    console.log(term);

    interests.push(selectedDepartment);

    if (
      selectedCampus == campus &&
      yearOfStudy * 100 == level &&
      requiredCourses.includes(code.slice(0, 6)) &&
      interests.includes(department)
    ) {
      filteredCourses.enqueue(example[i], meeting_sections.length);
    }
  }

  return filteredCourses;
}

function buildTimeTable(courseList, timePreference) {
  const excludedCourses = [];
  const disAllowedCourses = [];

  while (!courseList.isEmpty()) {
    const {
      id,
      code,
      name,
      description,
      division,
      department,
      prerequisites,
      exclusions,
      level,
      campus,
      term,
      meeting_sections,
      breadths,
      ,
    } = courseList.dequeue().element;

    const nextCourseCode = code.slice(0, 6);
    console.log(nextCourseCode);

    if (!disAllowedCourses.includes(nextCourseCode)) {
      disAllowedCourses.push(nextCourseCode);

      const courseExclusions = exclusions.split(',');
      for (let i = 0; i < courseExclusions.length; i++) {
        console.log(courseExclusions[i].replace(/[( )]/g, ''));
      }
    }
  }

  console.log(disAllowedCourses);
}
