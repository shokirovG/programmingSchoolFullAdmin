function balans2(students, workers, chiqimlar = [],majburiyChiqimlar=[]) {
  let totalBalans = 0;
  let totalMajburiy = 0
  if(majburiyChiqimlar.length > 0) {
    totalMajburiy =  majburiyChiqimlar[0].chiqimlar.reduce((s,item)=> {
      return s+Number(item.chiqimMiqdori)
    },0)
   
  }
 
  for (let worker of workers) {
    const teacherGroups = worker.groups;
    for (let teacherGroup of teacherGroups) {
      const filterGroupsStudents = students.filter(
        (el) => el.group.toUpperCase() === teacherGroup.toUpperCase()
      );

      const balans = filterGroupsStudents.reduce((s, student) => {
        return s + Number(student.price);
      }, 0);

      totalBalans += (balans * (100 - worker.priceFoiz)) / 100;
    }
  }

  const eskiOyStudent = students.filter(
    (el) => el.price > 0 && el.department === "Markaz"
  );

  let totalChiqim = 0;
  for (let a of chiqimlar) {
    for (let b of a.hisobot.chiqim) {
      const findUser = workers.filter(
        (el) => el.name === b.userAvans && el.groups.length === 0
      );

      if (
        b.costType !== "Avans" ||
        (b.costType === "Avans" && findUser.length > 0)
      ) {
        totalChiqim += Number(b.costValue);
      }
    }
  }

  const eskiOyBalans = eskiOyStudent.length > 0 ? eskiOyStudent[0].price : 0;
  return totalBalans + eskiOyBalans - totalChiqim - totalMajburiy;
}

export default balans2;
