
const itemsPerPage = 5;
let currentPage = 1;
function renderList(studentdata) {
  const studentList = document.createElement('div');
  const studentListData = document.createElement('ul');
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const itemsToDisplay = studentdata.slice(startIndex, endIndex);
  console.log(itemsToDisplay);

  // Clear The Current List 
  studentListData.innerHTML = '';

  itemsToDisplay.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `Student Name: ${item.name}, Gender: ${item.gender}`;
    studentListData.appendChild(listItem);
  });
  const paginationList = updatePagination(studentdata);
  studentList.appendChild(studentListData);
 studentList.appendChild(paginationList);

  console.log(studentList);
  return studentList;
}
function updatePagination(studentdata) {
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  pagination.innerHTML = '';
  // Create Previous Button

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Prev';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderList(studentdata);
    }
  });
  // Create Next Button

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = currentPage * itemsPerPage >= studentdata.length;
  nextBtn.addEventListener('click', () => {
    if (currentPage * itemsPerPage < studentdata.length) {
      currentPage++;
      console.log("Current Page Value", currentPage);
      renderList(studentdata);
    }
  });
  //Append buttons to the pagination container

  pagination.appendChild(prevBtn);
  pagination.appendChild(nextBtn);
  return pagination;
}
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
  const listData = renderList(studentdata);
  return listData;

}
export default async function decorate(block) {
  const students = block.querySelector('a[href$=".json"]');
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('student-block');
  if (students) {
    parentDiv.append(await createList(students.href, null));
    console.log(parentDiv);
    students.replaceWith(parentDiv);
  }
}
