import mockRes from './batman';

export function getAllShows() {
  return new Promise((resolve, reject) => {
    resolve("getAllShows");
  });
}

export function searchShow(filter: string) {
  return new Promise((resolve, reject) => {
    resolve(JSON.stringify(mockRes));
  });
}