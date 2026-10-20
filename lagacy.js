var  students = [
    {name: 'Zues',score: 86},
    {name: "Bob",score: 90},
    {name: "Elise",score: 86},
    {name: "nana",score: 76}
];

var topStudents = students
.filter( s => s.score >= 80)
.map(s => s.name.toUpperCase())
.sort();

console.log(topStudents);
