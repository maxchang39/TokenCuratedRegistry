/* eslint-env mocha */
/* global assert contract */
const utils = require('./utils-delegate.js');

const fs = require('fs');
const BN = require('bignumber.js');

const config = JSON.parse(fs.readFileSync('./conf/config.json'));
const paramConfig = config.paramDefaults;

contract('PLCRDVoting', (accounts) => {
  describe('Function: commitVote', () => {
    const [applicant, challenger, voter1, voter2] = accounts;

    let token;
    let voting;
    let parameterizer;
    let registry;

    beforeEach(async () => {
      const {
        votingProxy, paramProxy, registryProxy, tokenInstance,
      } = await utils.getProxies();
      voting = votingProxy;
      parameterizer = paramProxy;
      registry = registryProxy;
      token = tokenInstance;


      await utils.approveProxies(accounts, token, voting, parameterizer, registry);
    });

	it('should correctly update DLL state', async () => {
      const firstDomain = 'first.net';
      const secondDomain = 'second.net';
      const minDeposit = new BN(paramConfig.minDeposit, 10);

      await utils.as(applicant, registry.apply, firstDomain, minDeposit, '');
      await utils.as(applicant, registry.apply, secondDomain, minDeposit, '');
      const firstPollID = await utils.challengeAndGetPollID(firstDomain, challenger, registry);
      const secondPollID = await utils.challengeAndGetPollID(secondDomain, challenger, registry);
      await utils.commitVote(firstPollID, 1, 7, 420, voter1, voting);
      await utils.commitVote(secondPollID, 1, 8, 420, voter1, voting);
	  
	  
      const insertPoint1 = await voting.getInsertPointForNumTokens.call(voter1, 6, secondPollID);
      const expectedInsertPoint1 = 0;

      assert.strictEqual(
        insertPoint1.toString(10), expectedInsertPoint1.toString(10),
        'The insert point was not correct',
      );
	  
	  // Commit a higher bid, check the insert position
	  const insertPoint2 = await voting.getInsertPointForNumTokens.call(voter1, 10, secondPollID);
      const expectedInsertPoint2 = 1;

      assert.strictEqual(
        insertPoint2.toString(10), expectedInsertPoint2.toString(10),
        'The insert point was not correct',
      );
    });
	
    it('delegate commit should correctly update DLL state', async () => {
      const firstDomain = 'first.net';
      const secondDomain = 'second.net';
      const minDeposit = new BN(paramConfig.minDeposit, 10);

      await utils.as(applicant, registry.apply, firstDomain, minDeposit, '');
      await utils.as(applicant, registry.apply, secondDomain, minDeposit, '');
      const firstPollID = await utils.challengeAndGetPollID(firstDomain, challenger, registry);
      const secondPollID = await utils.challengeAndGetPollID(secondDomain, challenger, registry);

	  await utils.as(voter1, voting.approveDelegate, voter2, 10, firstPollID);
	  const actualAllowedValue = await utils.as(voter1, voting.allowanceDelegate, voter1, voter2, firstPollID);
	  const expectedAllowedValue = 10;
	  
      assert.strictEqual(
		expectedAllowedValue.toString(10), actualAllowedValue.toString(10),
        'The amount of approved token was not correct',
      );
	  
	  await utils.commitVoteFrom(firstPollID, 1, 7, 420, voter1, voter2, voting);
	  
	  // Commit a higher bid, check the insert position
	  const insertPoint = await voting.getInsertPointForNumTokens.call(voter1, 10, secondPollID);
      const expectedInsertPoint = 1;

      assert.strictEqual(
        insertPoint.toString(10), expectedInsertPoint.toString(10),
        'The insert point was not correct',
      );
    });
  });
});
