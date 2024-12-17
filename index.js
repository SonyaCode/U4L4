async function getData() {
    const response = await fetch("NYCStudentAttendance_2024_12_12.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1); // exclude the first line
   
    let schools = []
    let attendancePercentList = []
    rows.forEach((elem) => {
        const row = elem.split(",");
        const schoolDistrictNum = row[0].substring(0, 3)

        if (schoolDistrictNum == "13K") {
            const schoolName = row[1];
            schools.push(schoolName)

            const attendancePercent = row[3];
            attendancePercentList.push(attendancePercent)
        }
       
        console.log(schools, attendancePercentList);
    });

    const ctx = document.getElementById("myChart")
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: schools,
            datasets: [{
                label: "Attendance Rate",
                data: attendancePercentList,
                borderWidth: 1,
                backgroundColor: "pink",
                borderColor: "red",
                borderDash: [1, 3]
            }]
        },
        options: {
            plugins: {
                title: {
                display: true,
                text: "NYC District 13 Schools Attendance Rate on 12/12/2024"
                }
            },
            scales: {
                y : {
                    beingAtZero: true
                }
            }
        }
    })
}

getData()
