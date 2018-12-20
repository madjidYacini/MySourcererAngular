import { Injectable } from "@angular/core";
// import { Profile } from "../../interfaces/profile.i";
@Injectable({
  providedIn: "root"
})
export class ProfileTraitementService {
  constructor() {}
  getAvatarInfo(avatar: any) {
    let arr = this.nbOfcommitLineOC(avatar.repositories.nodes);
    let user = {
      name: avatar.login,
      followers: avatar.followers.totalCount,
      following: avatar.following.totalCount,
      commits: arr[1],
      lineOfCode: arr[0],
      avatarUrl: avatar.avatarUrl
    };

    return user;
  }

  nbOfcommitLineOC(repositories: any) {
    let nbCommit = 0;
    let lineOC = 0;
    let arrReturn = [];
    repositories.map(oneRepo => {
      let lOC = oneRepo.defaultBranchRef.target.history.nodes;
      lOC.map(addDel => {
        let diff = addDel.additions - addDel.deletions;
        lineOC = lineOC + diff;
      });
      nbCommit = nbCommit + oneRepo.ref.target.history.totalCount;
    });
    arrReturn[0] = lineOC;
    arrReturn[1] = nbCommit;
    return arrReturn;
  }
}
