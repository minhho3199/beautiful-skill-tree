import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import {
//   SkillTree,
//   SkillTreeGroup,
//   SkillProvider,
//   SkillGroupDataType,
//   SavedDataType,
// } from '../src';
import {
  SkillTree,
  SkillTreeGroup,
  SkillProvider,
  SkillGroupDataType,
  SavedDataType,
  NodeSelectEvent,
} from '../dist/index';
import './index.css';
import {
  legsPushData,
  legsPullData,
  hpSavedData,
  pushUpData,
  webDevData,
  createSkills,
  tree,
} from './mockData';
import { ContextStorage } from '../src/models';
import FilterInput from './components/FIlterInput';
import DisabledSkillTree from './components/DisabledSkillTree';
import { useState } from 'react';

function handleSave(
  storage: ContextStorage,
  treeId: string,
  skills: SavedDataType
) {
  // console.log(skills);
  return storage.setItem(`${treeId}`, JSON.stringify(skills));
}

const App = () => {
  const [skillPoints, setSkillPoints] = useState(10);

  function handleNodeSelect(e: NodeSelectEvent) {
    setSkillPoints(skillPoints - 1);
    console.log('Handle Node Select run');
    // console.log('Increment');
    // console.log(e);
    // console.log('selected node - ', e.key);
    // console.log('new state - ', e.state);
  }

  function handleNodeRemove(e: NodeSelectEvent) {
    setSkillPoints(skillPoints + 1);
    // console.log('Decrement');
    // console.log(e);
    // console.log('selected node - ', e.key);
    // console.log('new state - ', e.state);
  }
  const theme = {
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    primaryFont: 'Montserrat',
    headingFont: 'American Captain',
    headingFontColor: 'transparent',
    headingHoverColor: '#444453',
    nodeBorderColor: 'transparent',
    nodeBackgroundColor: 'transparent',
    nodeActiveBackgroundColor: '#31d0aa',
    tooltipTitleFontSize: '30px',
    treeBackgroundColor: '#2A2935',
    nodeHoverBorder: '4px solid #31d0aa',
    nodeHoverBorderColor: `linear-gradient(
      to right,
      #31d0aa 0%,
      #31d0aa 100%
    )`,
    edgeBorder: '1px solid #444165',
  };
  return (
    <SkillProvider>
      <SkillTreeGroup theme={theme}>
        {({
          skillCount,
          selectedSkillCount,
          resetSkills,
          handleFilter,
        }: SkillGroupDataType) => {
          const totalSkillCount = skillCount.optional + skillCount.required;
          const totalSelectedCount =
            selectedSkillCount.optional + selectedSkillCount.required;

          return (
            <React.Fragment>
              <nav
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '32px',
                }}
              >
                <ul>
                  <li>
                    <a href="#sp">Squat Progression</a>
                  </li>
                  <li>
                    <a href="#hp">Hinge Progression</a>
                  </li>
                </ul>
                <h2 className="Example__heading">
                  Completed skills: {totalSelectedCount}/{totalSkillCount}
                </h2>
                <button className="Example__reset-button" onClick={resetSkills}>
                  Reset
                </button>

                <FilterInput handleFilter={handleFilter} />
              </nav>
              <div>
                {/* <SkillTree
                  closedByDefault
                  treeId="sp"
                  handleNodeSelect={handleNodeSelect}
                  title="Squat Progression"
                  description="These are the progressions for squats"
                  data={legsPushData}
                  collapsible
                />
                <SkillTree
                  closedByDefault
                  treeId="pu"
                  handleNodeSelect={handleNodeSelect}
                  title={
                    <>
                      <span>Pull Up Progression</span>
                      <span style={{ position: 'absolute', right: '8px' }}>
                        ⓘ
                      </span>
                    </>
                  }
                  description="These are the progressions for pullups"
                  data={pushUpData}
                  collapsible
                />
                <SkillTree
                  treeId="hp"
                  handleNodeSelect={handleNodeSelect}
                  title="Hinge Progression"
                  data={legsPullData}
                  savedData={hpSavedData}
                  handleSave={handleSave}
                /> */}
                <SkillTree
                  treeId="web"
                  handleNodeSelect={handleNodeSelect}
                  handleNodeRemove={handleNodeRemove}
                  title={`Programming Tree ${skillPoints}`}
                  data={createSkills(tree)}
                  isOwner={true}
                  skillPoint={1000}
                  handleSave={handleSave}
                  currentLevel={1}
                />
              </div>
            </React.Fragment>
          );
        }}
      </SkillTreeGroup>
    </SkillProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
