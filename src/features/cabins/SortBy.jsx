import { useSearchParams } from "react-router-dom";
import Select from "../../ui/Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select onChange={handleChange} options={options} type="white" />;
}

export default SortBy;
