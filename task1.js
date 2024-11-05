const xml = 
<list> 
  <student> 
    <name lang="en"> 
      <first>Ivan</first> 
      <second>Ivanov</second> 
    </name> 
    <age>35</age> 
    <prof>teacher</prof> 
  </student> 
  <student> 
    <name lang="ru"> 
      <first>Петр</first> 
      <second>Петров</second> 
    </name> 
    <age>58</age> 
    <prof>driver</prof> 
  </student> 
</list>
;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xml, "text/xml");

const students = xmlDoc.getElementsByTagName("student");
const result = {
  list: [],
};

for (let i = 0; i < students.length; i++) {
  const student = students[i];
  const name = student.getElementsByTagName("name")[0];
  const first = name.getElementsByTagName("first")[0].textContent;
  const second = name.getElementsByTagName("second")[0].textContent;
  const age = student.getElementsByTagName("age")[0].textContent;
  const prof = student.getElementsByTagName("prof")[0].textContent;
  const lang = name.getAttribute("lang");

  result.list.push({
    name: `${first} ${second}`,
    age: Number(age),
    prof,
    lang,
  });
}

console.log(result);