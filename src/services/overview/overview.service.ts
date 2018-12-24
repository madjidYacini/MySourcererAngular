import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class OverviewService {
  formatData(repositories) {
    console.log(repositories);

    let datasets = [];
    let labels = [];
    repositories.map((oneRepo, id) => {
      let { defaultBranchRef, primaryLanguage } = repositories[id];
      let name = primaryLanguage.name;
      let found = datasets.some(obj => obj.label === name);
      if (!found) {
        datasets.push({
          label: name,
          data: [],
          lineTension: 0.1,
          backgroundColor: primaryLanguage.color
        });
      }
      if (defaultBranchRef.target !== null) {
        let index = datasets.findIndex(obj => obj.label === name);
        datasets[index].data.push(defaultBranchRef.target.history.totalCount);
        let date = new Date(defaultBranchRef.target.pushedDate);
        let yyyy = date.getFullYear();
        let mm = date.getMonth();
        let dd = date.getDate();
        if (labels.indexOf(`${dd}-${mm}-${yyyy}`) === -1) {
          labels.push(`${dd}-${mm}-${yyyy}`);
        }
      }
    });

    return {
      labels,
      datasets
    };
  }
  constructor() {}
}
