import { Injectable } from "@angular/core";
import { CommitsData } from "../../interfaces/commitsData.i";
@Injectable({
  providedIn: "root"
})
export class CommitsService {
  stats: CommitsData[] = [];
  getCommitStat(data: any) {
    let repositories = data.repositories.nodes;
    repositories.map(oneRepo => {
      let name = oneRepo.primaryLanguage.name;
      let commits = oneRepo.ref.target.history.totalCount;
      let index = this.stats.findIndex(obj => obj.language === name);
      if (index === -1) {
        let nbLine = oneRepo.defaultBranchRef.target.history.nodes;
        let nbLineC = this.nbLineCount(nbLine);
        let color = oneRepo.primaryLanguage.color;
        let stat = {
          language: name,
          color: color,
          lineOfCode: nbLineC,
          commits: commits
        };
        this.stats.push(stat);
      } else {
        let nbLine = oneRepo.defaultBranchRef.target.history.nodes;

        this.stats[index].lineOfCode =
          this.stats[index].lineOfCode + this.nbLineCount(nbLine);
        this.stats[index].commits = this.stats[index].commits + commits;
      }
    });
    return this.stats;
  }
  nbLineCount(nbLine: any) {
    let ress = 0;
    nbLine.map(onecommit => {
      let diff = onecommit.additions - onecommit.deletions;
      ress = ress + diff;
    });
    return ress;
  }
}
