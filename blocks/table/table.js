
async function createList(jsonURL, val) {
  let pathname = null;
  if (val) {
    pathname = jsonURL;
  }
  else {
    pathname = new URL(jsonURL);
  }
  const resp = await fetch(pathname);
  const json = await resp.json();
  const studentdata = json.data;
  console.log("json data", studentdata);
  const studentList = document.createElement('div');
  const studentListData = document.createElement('ul');
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  const itemsPerPage = 5;
  let currentPage = 1;

  studentdata.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `Student Name: ${item.name} Gender: ${item.gender}`;
    studentListData.appendChild(listItem);
  });
  studentList.appendChild(studentListData);
  studentList.appendChild(pagination);
 
  return studentList;
}
export default async function decorate(block) {
  const students = block.querySelector('a[href$=".json"]');
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('student-block');
  if (students) {
    parentDiv.append(await createList(students.href, null));
    students.replaceWith(parentDiv);
  }
}
