// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.


const testDatabases = [
  't/t',
  't/t-/t_f',
  't/t/_f',
  't/t-//t_f'
];

const tests = {};

testDatabases.forEach((db) => {
  return tests[`Db List works with special chars ${db}`] = createTest(db);
});

module.exports = tests;

function createTest (db) {
  return function (client) {

    const waitTime = client.globals.maxWaitTime;
    const baseUrl = client.globals.test_settings.launch_url;

    client
      .createDatabase(db)
      .loginToGUI()

      .url(baseUrl + '#/_all_dbs')
      .clickWhenVisible(`.fauxton-table-list a[href="database/${encodeURIComponent(db)}/_all_docs"]`)

      .waitForElementVisible('.faux-header__doc-header-title', waitTime, false)
      .waitForElementVisible('.no-results-screen', waitTime, false)

      .assert.containsText('.no-results-screen', 'No Documents Found')
      .assert.containsText('.faux-header__doc-header-title', db)
    .end();


  }
}