import { useQuery } from '@apollo/client';

import { GET_TODOS } from '../../apollo/queries';

const TestMsw = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <div data-testid='loading'>Loading...</div>;

  if (error) return <>Error...</>;

  return (
    <pre data-testid='intercept-graphql-calls'>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default TestMsw;
