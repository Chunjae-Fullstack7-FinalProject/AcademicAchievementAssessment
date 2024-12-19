const barScales = {
  xAxis: {
    ticks: {
      font: {
        size: 16,
      },
    },
  },
  yAxis: {
    ticks: {
      font: {
        size: 16,
      },
    },
  },
};

const barLegend = {
  legend: {
    labels: {
      // This more specific font property overrides the global property
      font: {
        size: 14,
      },
    },
  },
};

function readSubjectAbility(
  wrapBox,
  graph,
  examId,
  schoolLevel,
  subjectId,
  nickname
) {
  fetch(
    `/user/report/subject-ability?exam_id=${examId}&school_level=${schoolLevel}&subject_id=${subjectId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { result, list } = data;
      if (result === true) {
        const codeNameList = [];
        const userDataList = [];
        const averageList = [];
        let colgroupInnerHTML = '<col width="10%">';
        let thInnerHTML = '<tr><th scope="col"></th>';
        let averageInnerHTML = "<tr><td>평균</td>";
        let userDataInnerHTML = `<tr class="blue"><td>${nickname}</td>`;
        list.forEach((item, index) => {
          colgroupInnerHTML += '<col width="10%">';
          thInnerHTML += `<th scope="col">${item.code}</th>`;
          averageInnerHTML += `<td>${Math.round(item.average)}%</td>`;
          userDataInnerHTML += `<td>${Math.round(item.userData)}%</td>`;
          codeNameList.push(item.code);
          userDataList.push(item.userData !== null ? item.userData : 0);
          averageList.push(item.average !== null ? item.average : 0);
        });
        thInnerHTML += "</tr>";
        averageInnerHTML += "</tr>";
        userDataInnerHTML += "</tr>";
        wrapBox.querySelector("colgroup").innerHTML = colgroupInnerHTML;
        wrapBox.querySelector("thead").innerHTML = thInnerHTML;
        wrapBox.querySelector("tbody").innerHTML =
          averageInnerHTML + userDataInnerHTML;
        const ctx = graph.getContext("2d");
        const data = {
          labels: codeNameList,
          datasets: [
            {
              label: "전체 평균",
              data: averageList,
              backgroundColor: "transparent",
              borderColor: "rgba(194, 214, 154, 1)",
              borderWidth: 2.5,
            },
            {
              label: nickname,
              data: userDataList,
              backgroundColor: "transparent",
              borderColor: "rgba(83, 141, 213, 1)",
              borderWidth: 2.5,
            },
          ],
        };
        const myRadarChart = new Chart(ctx, {
          type: "radar",
          data: data,
          options: {
            responsive: false,
            maintainAspectRatio: false,
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 12,
              },
            },
            scale: {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 20,
              },
            },
            scales: {
              r: {
                pointLabels: {
                  font: {
                    size: 16,
                  },
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  font: {
                    size: 18,
                  },
                },
              },
            },
          },
        });
      }
    });
}

function readDifficultData(
  wrapBox,
  graph,
  examId,
  schoolLevel,
  subjectId,
  nickname
) {
  fetch(
    `/user/report/difficulty?exam_id=${examId}&school_level=${schoolLevel}&subject_id=${subjectId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result === true) {
        let dataJson = {};
        data.list.forEach((item, index) => {
          dataJson[item.code] = {
            userData: item.userData,
            average: item.average,
          };
        });
        const tbody = wrapBox.querySelector("tbody");
        let tbodyHTML = "";
        tbodyHTML += `<tr>
                <td>최상</td>
                <td>${
                  dataJson["DF01"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF01"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DF01"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF01"].userData) + "%"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>상</td>
                <td>${
                  dataJson["DF02"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF02"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DF02"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF02"].userData) + "%"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>중</td>
                <td>${
                  dataJson["DF03"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF03"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DF03"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF03"].userData) + "%"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>하</td>
                <td>${
                  dataJson["DF04"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF04"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DF04"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF04"].userData) + "%"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>최하</td>
                <td>${
                  dataJson["DF05"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF05"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DF05"] === undefined
                    ? "-"
                    : Math.round(dataJson["DF05"].userData) + "%"
                }</td>
            </tr>`;
        tbody.innerHTML = tbodyHTML;
        const ctx_2 = graph.getContext("2d");
        const data_2 = {
          labels: ["최하", "하", "중", "상", "최상"],
          datasets: [
            {
              label: "전체 평균",
              data: [
                dataJson["DF05"] === undefined
                  ? 0
                  : dataJson["DF05"].average === null
                  ? 0
                  : dataJson["DF05"].average,
                dataJson["DF04"] === undefined
                  ? 0
                  : dataJson["DF04"].average === null
                  ? 0
                  : dataJson["DF04"].average,
                dataJson["DF03"] === undefined
                  ? 0
                  : dataJson["DF03"].average === null
                  ? 0
                  : dataJson["DF03"].average,
                dataJson["DF02"] === undefined
                  ? 0
                  : dataJson["DF02"].average === null
                  ? 0
                  : dataJson["DF02"].average,
                dataJson["DF01"] === undefined
                  ? 0
                  : dataJson["DF01"].average === null
                  ? 0
                  : dataJson["DF01"].average,
              ],
              fill: false,
              backgroundColor: "rgba(237, 125, 49, 0.9)",
              borderColor: "rgba(237, 125, 49, 0.9)",
              borderWidth: 0,
            },
            {
              label: nickname,
              data: [
                dataJson["DF05"] === undefined
                  ? 0
                  : dataJson["DF05"].userData === null
                  ? 0
                  : dataJson["DF05"].userData,
                dataJson["DF04"] === undefined
                  ? 0
                  : dataJson["DF04"].userData === null
                  ? 0
                  : dataJson["DF04"].userData,
                dataJson["DF03"] === undefined
                  ? 0
                  : dataJson["DF03"].userData === null
                  ? 0
                  : dataJson["DF03"].userData,
                dataJson["DF02"] === undefined
                  ? 0
                  : dataJson["DF02"].userData === null
                  ? 0
                  : dataJson["DF02"].userData,
                dataJson["DF01"] === undefined
                  ? 0
                  : dataJson["DF01"].userData === null
                  ? 0
                  : dataJson["DF01"].userData,
              ],
              fill: false,
              backgroundColor: "rgba(83, 141, 213, 1)",
              borderColor: "rgba(83, 141, 213, 1)",
              borderWidth: 0,
            },
          ],
        };
        const difficultyChart = new Chart(ctx_2, {
          type: "bar",
          data: data_2,
          options: {
            y: {
              beginAtZero: false,
              min: 0,
              max: 100,
            },
            scales: barScales,
            plugins: barLegend,
          },
        });
      }
    });
}

function readContentCategory(
  wrapBox,
  graph,
  examId,
  schoolLevel,
  subjectId,
  nickname
) {
  fetch(
    `/user/report/content?exam_id=${examId}&school_level=${schoolLevel}&subject_id=${subjectId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result === true) {
        const labelList = [];
        const userDataList = [];
        const averageDataList = [];
        let tbodyHTML = "";
        data.list.forEach((item, index) => {
          labelList.push(item.code);
          userDataList.push(item.userData === null ? 0 : item.userData);
          averageDataList.push(item.average === null ? 0 : item.average);
          tbodyHTML += `<tr>
                    <td>${item.code}</td>
                    <td>${Math.round(item.average)}%</td>
                    <td class="blue">${Math.round(item.userData)}%</td>
                </tr>`;
        });
        wrapBox.querySelector("tbody").innerHTML = tbodyHTML;
        const ctx_3 = graph.getContext("2d");
        var data_3 = {
          labels: labelList,
          datasets: [
            {
              label: "전체 평균",
              data: averageDataList,
              backgroundColor: ["rgba(237, 125, 49, 0.9)"],
              borderWidth: 1,
              order: 1,
            },
            {
              label: nickname,
              data: userDataList,
              backgroundColor: "rgba(63, 114, 200, 0.5)",
              borderColor: "rgba(63, 114, 200, 0.5)",
              tension: 0.1,
              order: 2,
            },
          ],
        };
        const mybarLineChart_1 = new Chart(ctx_3, {
          type: "bar",
          data: data_3,
          options: {
            y: {
              beginAtZero: false,
            },
            scales: barScales,
          },
          plugins: barLegend,
        });
      }
    });
}

function readActivityCategory(
  wrapBox,
  graph,
  examId,
  schoolLevel,
  subjectId,
  nickname
) {
  fetch(
    `/user/report/activity?exam_id=${examId}&school_level=${schoolLevel}&subject_id=${subjectId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result === true) {
        const labelList = [];
        const userDataList = [];
        const averageDataList = [];
        let tbodyHTML = "";
        data.list.forEach((item, index) => {
          labelList.push(item.code);
          userDataList.push(item.userData);
          averageDataList.push(item.average);
          tbodyHTML += `<tr>
                    <td>${item.code}</td>
                    <td>${Math.round(item.average)}%</td>
                    <td class="blue">${Math.round(item.userData)}%</td>
                </tr>`;
        });
        wrapBox.querySelector("tbody").innerHTML = tbodyHTML;
        const ctx_4 = graph.getContext("2d");
        const data_4 = {
          labels: labelList,
          datasets: [
            {
              label: "전체 평균",
              data: averageDataList,
              backgroundColor: ["rgba(237, 125, 49, 0.9)"],
              borderWidth: 1,
              order: 1,
            },
            {
              label: nickname,
              data: userDataList,
              backgroundColor: "rgba(63, 114, 200, 0.5)",
              borderColor: "rgba(63, 114, 200, 0.5)",
              tension: 0.1,
              order: 2,
            },
          ],
        };
        const mybarLineChart_2 = new Chart(ctx_4, {
          type: "bar",
          data: data_4,
          options: {
            y: {
              beginAtZero: false,
              min: 0,
              max: 100,
            },
            scales: barScales,
          },
        });
      }
    });
}

function readDifficultByTime(
  wrapBox,
  graph,
  examId,
  schoolLevel,
  subjectId,
  nickname,
  averageTime
) {
  fetch(
    `/user/report/difficulty-time?exam_id=${examId}&school_level=${schoolLevel}&subject_id=${subjectId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result === true) {
        let dataJson = {};
        data.list.forEach((item, index) => {
          dataJson[item.code] = {
            userData: item.userData,
            average: item.average,
          };
        });

        const tbody = wrapBox.querySelector("tbody");
        let tbodyHTML = "";
        tbodyHTML += `<tr>
                <td>최상</td>
                <td>${
                  dataJson["DF01"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF01"].average / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF01"].average / 60) + "분 ") +
                      Math.round(dataJson["DF01"].average % 60) +
                      "초"
                }</td>
                <td class="blue">${
                  dataJson["DF01"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF01"].userData / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF01"].userData / 60) + "분 ") +
                      Math.round(dataJson["DF01"].userData % 60) +
                      "초"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>상</td>
                <td>${
                  dataJson["DF02"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF02"].average / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF02"].average / 60) + "분 ") +
                      Math.round(dataJson["DF02"].average % 60) +
                      "초"
                }</td>
                <td class="blue">${
                  dataJson["DF02"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF02"].userData / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF02"].userData / 60) + "분 ") +
                      Math.round(dataJson["DF02"].userData % 60) +
                      "초"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>중</td>
                <td>${
                  dataJson["DF03"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF03"].average / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF03"].average / 60) + "분 ") +
                      Math.round(dataJson["DF03"].average % 60) +
                      "초"
                }</td>
                <td class="blue">${
                  dataJson["DF03"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF03"].userData / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF03"].userData / 60) + "분 ") +
                      Math.round(dataJson["DF03"].userData % 60) +
                      "초"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>하</td>
                <td>${
                  dataJson["DF04"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF04"].average / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF04"].average / 60) + "분 ") +
                      Math.round(dataJson["DF04"].average % 60) +
                      "초"
                }</td>
                <td class="blue">${
                  dataJson["DF04"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF04"].userData / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF04"].userData / 60) + "분 ") +
                      Math.round(dataJson["DF04"].userData % 60) +
                      "초"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>최하</td>
                <td>${
                  dataJson["DF05"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF05"].average / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF05"].average / 60) + "분 ") +
                      Math.round(dataJson["DF05"].average % 60) +
                      "초"
                }</td>
                <td class="blue">${
                  dataJson["DF05"] === undefined
                    ? "-"
                    : (parseInt(dataJson["DF05"].userData / 60) === 0
                        ? ""
                        : parseInt(dataJson["DF05"].userData / 60) + "분 ") +
                      Math.round(dataJson["DF05"].userData % 60) +
                      "초"
                }</td>
            </tr>`;
        tbody.innerHTML = tbodyHTML;
        const ctx_5 = graph.getContext("2d");
        const data_5 = {
          labels: ["최하", "하", "중", "상", "최상"],
          datasets: [
            {
              label: "전체 평균",
              data: [
                dataJson["DF05"] === undefined ? 0 : dataJson["DF05"].average,
                dataJson["DF04"] === undefined ? 0 : dataJson["DF04"].average,
                dataJson["DF03"] === undefined ? 0 : dataJson["DF03"].average,
                dataJson["DF02"] === undefined ? 0 : dataJson["DF02"].average,
                dataJson["DF01"] === undefined ? 0 : dataJson["DF01"].average,
              ],
              backgroundColor: ["rgba(237, 125, 49, 0.9)"],
              borderWidth: 1,
              order: 1,
            },
            {
              label: nickname,
              data: [
                dataJson["DF05"] === undefined ? 0 : dataJson["DF05"].userData,
                dataJson["DF04"] === undefined ? 0 : dataJson["DF04"].userData,
                dataJson["DF03"] === undefined ? 0 : dataJson["DF03"].userData,
                dataJson["DF02"] === undefined ? 0 : dataJson["DF02"].userData,
                dataJson["DF01"] === undefined ? 0 : dataJson["DF01"].userData,
              ],
              backgroundColor: "rgba(63, 114, 200, 0.5)",
              borderColor: "rgba(63, 114, 200, 0.5)",
              tension: 0.1,
              order: 2,
            },
          ],
        };
        const mybarLineChart_3 = new Chart(ctx_5, {
          type: "bar",
          data: data_5,
          options: {
            y: {
              beginAtZero: true,
              min: 0,
              max: averageTime,
            },
            scales: barScales,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += " : ";
                    }
                    let y = context.parsed.y;
                    if (y) {
                      y = Math.round(Number(y));
                      let min = parseInt(y / 60);
                      let sec = y % 60;
                      if (min !== 0) {
                        label += min + "분 ";
                      }
                      if (sec !== 0) {
                        label += sec + "초";
                      }
                    }
                    return label;
                  },
                },
              },
            },
          },
        });
      }
    });
}

function readContentByTime(
  wrapBox,
  graph,
  examId,
  schoolLevel,
  subjectId,
  nickname,
  averageTime
) {
  fetch(
    `/user/report/content-time?exam_id=${examId}&school_level=${schoolLevel}&subject_id=${subjectId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result === true) {
        const labelList = [];
        const userDataList = [];
        const averageDataList = [];
        const tbody = wrapBox.querySelector("tbody");
        tbody.innerHTML = "";
        data.list.forEach((item, index) => {
          labelList.push(item.code);
          userDataList.push(item.userData === null ? 0 : item.userData);
          averageDataList.push(item.average === null ? 0 : item.average);
          let averageMin = parseInt(Math.round(item.average) / 60);
          let averageSec = Math.round(item.average) % 60;
          let userDataMin = parseInt(Math.round(item.userData) / 60);
          let userDataSec = Math.round(item.userData) % 60;
          tbody.innerHTML += `<tr>
                    <td>${item.code}</td>
                    <td>${
                      averageMin === 0 ? "" : averageMin + "분 "
                    }${averageSec}초</td>
                    <td class="blue">${
                      userDataMin === 0 ? "" : userDataMin + "분 "
                    }${userDataSec}초</td>
                </tr>`;
        });
        const ctx_6 = graph.getContext("2d");
        const data_6 = {
          labels: labelList,
          datasets: [
            {
              label: "전체 평균",
              data: averageDataList,
              backgroundColor: ["rgba(237, 125, 49, 0.9)"],
              borderWidth: 1,
              order: 1,
            },
            {
              label: nickname,
              data: userDataList,
              backgroundColor: "rgba(63, 114, 200, 0.5)",
              borderColor: "rgba(63, 114, 200, 0.5)",
              tension: 0.1,
              order: 2,
            },
          ],
        };
        const mybarLineChart_4 = new Chart(ctx_6, {
          type: "bar",
          data: data_6,
          options: {
            y: {
              beginAtZero: true,
              min: 0,
              max: averageTime,
              stepSize: 20,
            },
            scales: barScales,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += " : ";
                    }
                    let y = context.parsed.y;
                    if (y) {
                      y = Math.round(Number(y));
                      let min = parseInt(y / 60);
                      let sec = y % 60;
                      if (min !== 0) {
                        label += min + "분 ";
                      }
                      if (sec !== 0) {
                        label += sec + "초";
                      }
                    }
                    return label;
                  },
                },
              },
            },
          },
        });
      }
    });
}

function readItemType(
  wrapBox,
  graph,
  examId,
  schoolLevel,
  subjectId,
  nickname
) {
  fetch(
    `/user/report/item-type?exam_id=${examId}&school_level=${schoolLevel}&subject_id=${subjectId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result === true) {
        let dataJson = {};
        data.list.forEach((item, index) => {
          dataJson[item.code] = {
            userData: item.userData,
            average: item.average,
          };
        });
        const tbody = wrapBox.querySelector("tbody");
        let tbodyHTML = "";
        tbodyHTML += `<tr>
                <td>단순 제시형</td>
                <td>${
                  dataJson["DT01"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT01"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DT01"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT01"].userData) + "%"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>정보 활용형</td>
                <td>${
                  dataJson["DT02"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT02"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DT02"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT02"].userData) + "%"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>미디어활용형</td>
                <td>${
                  dataJson["DT03"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT03"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DT03"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT03"].userData) + "%"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>도구 조작 및 시뮬레이션형</td>
                <td>${
                  dataJson["DT04"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT04"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DT04"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT04"].userData) + "%"
                }</td>
            </tr>`;
        tbodyHTML += `<tr>
                <td>대화형</td>
                <td>${
                  dataJson["DT05"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT05"].average) + "%"
                }</td>
                <td class="blue">${
                  dataJson["DT05"] === undefined
                    ? "-"
                    : Math.round(dataJson["DT05"].userData) + "%"
                }</td>
            </tr>`;
        tbody.innerHTML = tbodyHTML;
        var ctx_7 = graph.getContext("2d");
        var data_7 = {
          labels: [
            "단순 제시형",
            "정보 활용형",
            "미디어 활용형",
            "도구 조작 및 시뮬레이션형",
            "대화형",
          ],
          datasets: [
            {
              fill: false,
              label: "전체 평균",
              data: [
                dataJson["DT01"] === undefined ? 0 : dataJson["DT01"].average,
                dataJson["DT02"] === undefined ? 0 : dataJson["DT02"].average,
                dataJson["DT03"] === undefined ? 0 : dataJson["DT03"].average,
                dataJson["DT04"] === undefined ? 0 : dataJson["DT04"].average,
                dataJson["DT05"] === undefined ? 0 : dataJson["DT05"].average,
              ],
              backgroundColor: "rgba(237, 125, 49, 0.9)",
              borderColor: "rgba(237, 125, 49, 0.9)",
              borderWidth: 1,
              order: 1,
              tension: 0.1,
              lineTension: 0,
            },
            {
              fill: false,
              label: nickname,
              data: [
                dataJson["DT01"] === undefined ? 0 : dataJson["DT01"].userData,
                dataJson["DT02"] === undefined ? 0 : dataJson["DT02"].userData,
                dataJson["DT03"] === undefined ? 0 : dataJson["DT03"].userData,
                dataJson["DT04"] === undefined ? 0 : dataJson["DT04"].userData,
                dataJson["DT05"] === undefined ? 0 : dataJson["DT05"].userData,
              ],
              backgroundColor: "rgba(63, 114, 200, 0.9)",
              borderColor: "rgba(63, 114, 200, 0.9)",
              borderWidth: 1,
              order: 2,
              tension: 0.1,
              lineTension: 0,
            },
          ],
        };
        var mybarLineChart_5 = new Chart(ctx_7, {
          type: "bar",
          data: data_7,
          legend: {
            position: "bottom",
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              y: {
                min: 0,
                max: 100,
              },
            },
          },
        });
      }
    });
}

function readResponseType(
  wrapBox,
  graph,
  examId,
  schoolLevel,
  subjectId,
  nickname
) {
  fetch(
    `/user/report/response-type?exam_id=${examId}&school_level=${schoolLevel}&subject_id=${subjectId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result === true) {
        let dataJson = {};
        data.list.forEach((item, index) => {
          if (item !== null) {
            dataJson[item.code] = {
              userData: item.userData,
              average: item.average,
            };
          }
        });
        const tbody = wrapBox.querySelector("tbody");
        let tbodyHTML = "";
        tbodyHTML += `<tr>
                    <td>선다형</td>
                    <td>${
                      dataJson["II01"] === undefined
                        ? "-"
                        : Math.round(dataJson["II01"].average) + "%"
                    }</td>
                    <td class="blue">${
                      dataJson["II01"] === undefined
                        ? "-"
                        : Math.round(dataJson["II01"].userData) + "%"
                    }</td>
                </tr>`;
        tbodyHTML += `<tr>
                    <td>확장 선택형</td>
                    <td>${
                      dataJson["II02"] === undefined
                        ? "-"
                        : Math.round(dataJson["II02"].average) + "%"
                    }</td>
                    <td class="blue">${
                      dataJson["II02"] === undefined
                        ? "-"
                        : Math.round(dataJson["II02"].userData) + "%"
                    }</td>
                </tr>`;
        tbodyHTML += `<tr>
                    <td>자료 연결형</td>
                    <td>${
                      dataJson["II03"] === undefined
                        ? "-"
                        : Math.round(dataJson["II03"].average) + "%"
                    }</td>
                    <td class="blue">${
                      dataJson["II03"] === undefined
                        ? "-"
                        : Math.round(dataJson["II03"].userData) + "%"
                    }</td>
                </tr>`;
        tbodyHTML += `<tr>
                    <td>순서 배열형</td>
                    <td>${
                      dataJson["II04"] === undefined
                        ? "-"
                        : Math.round(dataJson["II04"].average) + "%"
                    }</td>
                    <td class="blue">${
                      dataJson["II04"] === undefined
                        ? "-"
                        : Math.round(dataJson["II04"].userData) + "%"
                    }</td>
                </tr>`;
        tbodyHTML += `<tr>
                    <td>단답형</td>
                    <td>${
                      dataJson["II05"] === undefined
                        ? "-"
                        : Math.round(dataJson["II05"].average) + "%"
                    }</td>
                    <td class="blue">${
                      dataJson["II05"] === undefined
                        ? "-"
                        : Math.round(dataJson["II05"].userData) + "%"
                    }</td>
                </tr>`;
        tbodyHTML += `<tr>
                    <td>서술형</td>
                    <td>${
                      dataJson["II06"] === undefined
                        ? "-"
                        : Math.round(dataJson["II06"].average) + "%"
                    }</td>
                    <td class="blue">${
                      dataJson["II06"] === undefined
                        ? "-"
                        : Math.round(dataJson["II06"].userData) + "%"
                    }</td>
                </tr>`;
        tbodyHTML += `<tr>
                    <td>수정형</td>
                    <td>${
                      dataJson["II07"] === undefined
                        ? "-"
                        : Math.round(dataJson["II07"].average) + "%"
                    }</td>
                    <td class="blue">${
                      dataJson["II07"] === undefined
                        ? "-"
                        : Math.round(dataJson["II07"].userData) + "%"
                    }</td>
                </tr>`;
        tbodyHTML += `<tr>
                    <td>그래프 그림 완성형</td>
                    <td>${
                      dataJson["II08"] === undefined
                        ? "-"
                        : Math.round(dataJson["II08"].average) + "%"
                    }</td>
                    <td class="blue">${
                      dataJson["II08"] === undefined
                        ? "-"
                        : Math.round(dataJson["II08"].userData) + "%"
                    }</td>
                </tr>`;
        tbody.innerHTML = tbodyHTML;
        const ctx_8 = graph.getContext("2d");
        const data_8 = {
          labels: [
            "선다형",
            "확장 선택형",
            "자료 연결형",
            "순서배열형",
            "단답형",
            "서술형",
            "수정형",
            "그래프 그림",
          ],
          datasets: [
            {
              label: "전체 평균",
              data: [
                dataJson["II01"] === undefined ? 0 : dataJson["II01"].average,
                dataJson["II02"] === undefined ? 0 : dataJson["II02"].average,
                dataJson["II03"] === undefined ? 0 : dataJson["II03"].average,
                dataJson["II04"] === undefined ? 0 : dataJson["II04"].average,
                dataJson["II05"] === undefined ? 0 : dataJson["II05"].average,
                dataJson["II06"] === undefined ? 0 : dataJson["II06"].average,
                dataJson["II07"] === undefined ? 0 : dataJson["II07"].average,
                dataJson["II08"] === undefined ? 0 : dataJson["II08"].average,
              ],
              backgroundColor: "rgba(237, 125, 49, 0.9)",
              borderColor: "rgba(237, 125, 49, 0.9)",
              borderWidth: 1,
              order: 1,
              tension: 0.1,
            },
            {
              label: nickname,
              data: [
                dataJson["II01"] === undefined ? 0 : dataJson["II01"].userData,
                dataJson["II02"] === undefined ? 0 : dataJson["II02"].userData,
                dataJson["II03"] === undefined ? 0 : dataJson["II03"].userData,
                dataJson["II04"] === undefined ? 0 : dataJson["II04"].userData,
                dataJson["II05"] === undefined ? 0 : dataJson["II05"].userData,
                dataJson["II06"] === undefined ? 0 : dataJson["II06"].userData,
                dataJson["II07"] === undefined ? 0 : dataJson["II07"].userData,
                dataJson["II08"] === undefined ? 0 : dataJson["II08"].userData,
              ],
              backgroundColor: "rgba(63, 114, 200, 0.9)",
              borderColor: "rgba(63, 114, 200, 0.9)",
              borderWidth: 1,
              order: 2,
              tension: 0.1,
            },
          ],
        };
        const mybarLineChart_6 = new Chart(ctx_8, {
          type: "bar",
          data: data_8,
          legend: {
            position: "bottom",
          },
          layout: {
            padding: 10,
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 20,
                padding: 10,
                maxRotation: 0,
                callback: function (value, index, values) {
                  if (value !== 100) {
                    return values[index];
                  }
                },
              },
            },
          },
        });
      }
    });
}
