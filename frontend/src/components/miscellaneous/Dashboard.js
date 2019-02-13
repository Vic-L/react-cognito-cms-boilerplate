import _ from 'lodash';
import React from 'react';
import { Query } from 'react-apollo';
import { Grid, Cell } from 'styled-css-grid';

import TransitionWrapper from '_transitions/TransitionWrapper';
import Shimmer from '_elements/Shimmer';
import withCallbackAlert from '_hocs/withCallbackAlert';
import {
  GET_POKEMONS,
} from '_queries';
import HandleGraphQLSimpleError from '_services/HandleGraphQLSimpleError';

const ButtonWithLoader = React.lazy(() => import('_buttons/ButtonWithLoader'))

const Dashboard = ({
  updateAlert,
  alertResponse,
  updateAlertResponse,
}) => {
  return(
    <Grid columns={3} gap='1rem'>
      <Cell/>

      <Cell>
        <h1>POKEMONS</h1>
        <Query
          fetchPolicy='network-only'
          query={GET_POKEMONS}
          variables={{ count: 10 }}>

          {({ loading, error, data, refetch }) => {
            if (error) {
              HandleGraphQLSimpleError(updateAlert, error)
              return <p>Error</p>
            }

            if (alertResponse === 'POSITIVE') {
              refetch()
            }

            if (alertResponse) {
              updateAlertResponse({
                variables: {
                  alertResponse: null
                }
              })
            }

            const html = [
              <React.Suspense
                key='refetch-button'
                fallback={<Shimmer />}
              >
                <ButtonWithLoader
                  isLoading={loading}
                  disabled={loading}
                  text="Refetch!"
                  onClick={() => {
                    updateAlert({
                      variables: {
                        title: '',
                        body: 'Are you sure?',
                        actions: [
                          {
                            text: 'YES',
                            alertResponse: 'POSITIVE',
                          },
                          {
                            text: 'NO',
                            alertResponse: 'NEGATIVE',
                          }
                        ]
                      }
                    });
                  }}
                />
              </React.Suspense>
            ];

            if (_.isNil(data.pokemons)) {
              html.unshift(<p key='no-post'>No pokemons?!</p>);
              return html;
            }

            const posts = data.pokemons.map(pokemon => (
              <p key={`pokemon-${pokemon.id}`}>{pokemon.name}</p>
            ));

            posts.push(html);
            return posts;
          }}
        </Query>
      </Cell>

      <Cell />
    </Grid>
  );
};

export default TransitionWrapper(withCallbackAlert(Dashboard));
