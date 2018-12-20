import { Injectable } from "@angular/core";
import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class GqlQueriesService {
  GET_USER_INFO = gql`
    query {
      viewer {
        name
        followers {
          totalCount
        }
        following {
          totalCount
        }
        avatarUrl
        login
        createdAt
        repositories(first: 50, isFork: false) {
          nodes {
            nameWithOwner
            name
            url
            languages(last: 5) {
              nodes {
                name
              }
            }
            defaultBranchRef {
              name
              target {
                ... on Commit {
                  history {
                    totalCount
                    nodes {
                      additions
                      deletions
                    }
                  }
                }
              }
            }

            collaborators(first: 10) {
              totalCount
              edges {
                permission
                node {
                  name
                  avatarUrl
                }
              }
            }
            ref(qualifiedName: "master") {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  GET_USER_RC = gql`
    query {
      viewer {
        avatarUrl
        login
        createdAt
        repositories(first: 25) {
          nodes {
            primaryLanguage {
              name
              color
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    nodes {
                      additions
                      deletions
                    }
                    totalCount
                  }
                }
              }
            }

            ref(qualifiedName: "refs/heads/master") {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}
