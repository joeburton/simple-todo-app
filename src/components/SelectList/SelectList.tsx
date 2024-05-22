import { useQuery } from "@apollo/client";
import { GET_LIST_NAMES } from "../../apollo/queries";

const SelectList = () => {
  const { data } = useQuery(GET_LIST_NAMES);
  console.log(data);
  return (
    <ul data-testid='select-list'>
      {data?.getListNames && (
        <>
          {data.getListNames.map(
            (list: { listName: string; id: string }, i: string) => {
              return (
                <li data-testid={list.listName} key={i}>
                  {list.listName}
                </li>
              );
            }
          )}
        </>
      )}
    </ul>
  );
};

export default SelectList;
