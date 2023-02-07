import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const contentfulManage = require("contentful-management");
const contentful = require("contentful");

const manageClient = contentfulManage.createClient({
  accessToken: "CFPAT-z2VSka5LTzVTR37DE-GS2hWJQCrZnnoCZtemtrRerYg",
});

export const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "q0yf94d7v33c",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "-jRruvA3CsxCUxk7wyucX_3wKv5EuAXQEZdVCw8WREY",
});

// Update content type
export const updateTag = () => {
  // Create content type
  client
    .getSpace("q0yf94d7v33c")
    .then((space) => space.getEnvironment("master"))
    .then((environment) =>
      environment.createContentTypeWithId("blogpost", {
        name: "Blog Post",
        fields: [
          {
            id: "title",
            name: "Title",
            required: true,
            localized: false,
            type: "Text",
          },
        ],
      })
    )
    .then((contentType) => console.log(contentType))
    .catch(console.error);
  client
    .getSpace("q0yf94d7v33c")
    .then((space) => space.getEnvironment("master"))
    .then((environment) => environment.getContentType("tag"))
    .then((contentType) => {
      contentType.name = "ho creato un content type";
      return contentType.update();
    })

    .catch(console.error);
};

export async function createTodoInContentfull(element, string) {
  // Create entry
  let uniqueId = await string;
  manageClient
    .getSpace("q0yf94d7v33c")
    .then((space) => space.getEnvironment("master"))
    .then((environment) =>
      environment.createEntryWithId("todo", `${uniqueId}`, {
        fields: {
          text: {
            "en-US": element.text,
            "it-IT": element.text,
          },
          tag: {
            "en-US": {
              sys: {
                type: "Link",
                linkType: "Entry",
                id: element.tag.sys.id,
              },
            },
            "it-IT": {
              sys: {
                type: "Link",
                linkType: "Entry",
                id: element.tag.sys.id,
              },
            },
          },
        },
      })
    )
    .then((entry) => entry.publish())
    .catch(console.error);
}

//it work  need to store the id as parameter =>  sys.id
export const updateAnEntry = async (entryId, element) => {
  //update
  manageClient
    .getSpace("q0yf94d7v33c")
    .then((space) => space.getEnvironment("master"))
    .then((environment) => environment.getEntry(entryId))
    .then((entry) => {
      entry.fields.text["en-US"] = element.text;
      entry.fields.text["it-IT"] = element.text;
      entry.fields.tag["en-US"].sys.id = element.tag.sys.id;
      entry.fields.tag["it-IT"].sys.id = element.tag.sys.id;
      entry.fields.completed["en-US"] = element.completed;
      entry.fields.completed["it-IT"] = element.completed;
      return entry.update();
    })
    .then((entry) => entry.publish())
    .catch(console.error);
};
export const updateCompleted = async (entryId, boolean) => {
  //update
  manageClient
    .getSpace("q0yf94d7v33c")
    .then((space) => space.getEnvironment("master"))
    .then((environment) => environment.getEntry(entryId))
    .then((entry) => {
      entry.fields.completed["en-US"] = boolean;
      entry.fields.completed["it-IT"] = boolean;
      return entry.update();
    })
    .then((entry) => entry.publish())
    .catch(console.error);
};

export async function getEntriesByContentType(param) {
  client
    .getEntries({
      content_type: param,
    })
    .then((response) => {
      return response.items;
    })

    .catch(console.error);
}

export async function mapTag(tag) {
  let elements = await client
    .getEntries({
      content_type: "tag",
    })
    .then((response) => {
      return response.items;
    })

    .catch(console.error);
  elements = elements.map((item) => ({
    tag: {
      categoryName: item.fields.category_name,
      id: item.sys.id,
    },
  }));

  let singleTag = elements.filter((item) => item.tag.categoryName === tag);
  return singleTag[0];
}

export const deleteTodoEntry = (id) => {
  manageClient
    .getSpace("q0yf94d7v33c")
    .then((space) => space.getEnvironment("master"))
    .then((environment) => environment.getEntry(id))
    .then((entry) => entry.unpublish())
    .then((entry) => entry.delete())
    .then(() => console.log("Entry deleted."))
    .catch(console.error);
};

export async function getTagFromContentfull() {
  let elements = await client
    .getEntries({
      content_type: "tag",
    })
    .then((response) => {
      return response.items
        .map((item) => ({
          tag: {
            categoryName: item.fields.category_name,
            id: item.sys.id,
            color: item.fields.color,
          },
        }))
        .map((item) => item.tag);
    })

    .catch(console.error);
  return elements;
}
getTagFromContentfull();

export function findUnvalidTodo(item) {
  let newArray = [];
  let elements = item.map((element) => {
    if (
      element.tag === null ||
      element.sys.id === null ||
      element.completed === null
    ) {
      manageClient
        .getSpace("q0yf94d7v33c")
        .then((space) => space.getEnvironment("master"))
        .then((environment) => environment.getEntry(element.sys.id));
      // .then((entry) => entry.unpublish());
    } else newArray.push(element);
  });
  return newArray;
}

function trialPayment() {
  fetch("http://localhost:3003/payment")
    .then((response) => response.json())
    .then((payment) => console.log(payment));
}
trialPayment();
function trialPaymentWithParam() {
  fetch("http://localhost:3003/payment/dsadasgads")
    .then((response) => response.json())
    .then((payment) => console.log(payment));
}
trialPaymentWithParam();
