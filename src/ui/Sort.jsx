import { useSearchParams } from "react-router-dom";
import SelectOptions from "./SelectOptions";

const Sort = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get("sort") || "";

  const handleChange = (e) => {
    if (e.target.value) {
      searchParams.set("sort", e.target.value);
      setSearchParams(searchParams);
    }
  };

  return (
    <SelectOptions
      options={options}
      onChange={handleChange}
      value={sortParam}
    />
  );
};

export default Sort;
