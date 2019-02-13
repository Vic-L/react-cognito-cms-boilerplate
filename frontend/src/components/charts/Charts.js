import React from 'react';
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryPie,
} from 'victory';
import {
  Grid,
  Cell,
} from 'styled-css-grid';

import CardContainer from '_cards/CardContainer';

class Charts extends React.Component {
  getData() {
    return [
      {quarter: 1, earnings: 13000},
      {quarter: 2, earnings: 16500},
      {quarter: 3, earnings: 14250},
      {quarter: 4, earnings: 19000}
    ];
  }
  render() {
    return (
      <React.Fragment>
        <h2>Charts</h2>

        <Grid columns={2} gap='1rem'>
          <Cell>
            <React.Suspense fallback={<div />}>
              <CardContainer>
                {() =>
                  <VictoryChart
                    domainPadding={20}
                  >
                    <VictoryAxis
                      tickValues={[1, 2, 3, 4]}
                      tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                      data={this.getData()}
                      x="quarter"
                      y="earnings"
                    />
                  </VictoryChart>
                }
              </CardContainer>
            </React.Suspense>
          </Cell>
          <Cell>
            <React.Suspense fallback={<div />}>
              <CardContainer>
                {() =>
                  <VictoryPie
                    data={[
                      { x: 'Cats', y: 35 },
                      { x: 'Dogs', y: 40 },
                      { x: 'Birds', y: 55 }
                    ]}
                  />
                }
              </CardContainer>
            </React.Suspense>
          </Cell>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Charts;
