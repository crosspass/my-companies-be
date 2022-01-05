import React from 'react';
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import _ from 'lodash';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  debounceTimeout?: number;
  initValues: Array<CompanyValue>;
}

// Usage of DebounceSelect
interface CompanyValue {
  label: string;
  value: string;
}

async function fetchCompanyList(key: string): Promise<CompanyValue[]> {
  if (key == '') {
    return [];
  }
  console.log('fetching user', key);
  return fetch(`/api/company/search?key=${key}`)
    .then((response) => response.json())
    .then((body) =>
      body.companies.map((company: { ID: number; Name: string }) => ({
        label: company.Name,
        value: company.ID,
      })),
    );
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: string;
    value: string | number;
  } = any
>({ debounceTimeout = 800, initValues = [], ...props }: DebounceSelectProps) {
  const [fetching, setFetching] = React.useState(false);
  const companyOptions = _.map(initValues, (v) => ({
    label: v.Name,
    value: v.ID,
  }));
  const [options, setOptions] = React.useState<Array<ValueType>>(
    companyOptions,
  );
  const fetchRef = React.useRef(0);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);

      fetchCompanyList(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions([...companyOptions, ...newOptions]);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchCompanyList, debounceTimeout, initValues]);

  return (
    <Select<ValueType>
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

export default DebounceSelect;
