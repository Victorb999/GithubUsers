import axios from "axios";
import { Users, User } from "@/api/InterfacesGithubUsers";

const endpoint = "https://api.github.com/";

export async function getUsers(
  q: Array<string>,
  page: number,
  sort?: string,
  order?: string,
  perPage?: number
) {
  //montando a query
  let query = "?q=";
  q.map(par => {
    query += `${par} `;
  });
  query += `&page=${page}`;
  query += sort ? `&sort=${sort}` : "&sort=followers";
  query += order ? `&order=${order}` : "";
  query += perPage ? `&per_page=${perPage}` : "";
  const url = "search/users" + query;

  let githubUsers = {} as Users;
  await axios({
    method: "get",
    baseURL: endpoint,
    url: url
  })
    .then(response => {
      githubUsers = response.data;
    })
    .catch(() => {
      return false;
    });
  return githubUsers;
}

export async function getUser(userName: string) {
  const url = "/users/" + userName;
  let githubUser = {} as User;
  await axios({
    method: "get",
    baseURL: endpoint,
    url: url
  })
    .then(response => {
      githubUser = response.data;
    })
    .catch(() => {
      return false;
    });
  return githubUser;
}
