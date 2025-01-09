import Form from "next/form";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchFormReset from "@/components/SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startup"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <Button type="submit" className="search-btn">
          <Search className="size-5 text-white" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
