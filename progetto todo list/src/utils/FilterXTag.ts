import { Todo } from "../features/Todo/Todo";

export const filterArrayXTag = (tags: any, arrayToFilter: any) => {
  let finalArray: any[] = [];
  for (let i = 0; i < tags.length; i++) {
    let singleTag = tags[i];
    finalArray.push(
      arrayToFilter.filter(
        (element: any) => element.tag.categoryName === singleTag
      )
    );
    finalArray = finalArray.flat();
  }
  return finalArray;
};
