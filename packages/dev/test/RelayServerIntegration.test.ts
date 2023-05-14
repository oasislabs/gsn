import { HttpProvider } from 'web3-core'
import { GSNConfig } from '@opengsn/provider/dist/GSNConfigurator'
import { ServerConfigParams } from '@opengsn/relay/dist/ServerConfigParams'
import { LocalhostOne, ServerTestEnvironment } from './ServerTestEnvironment'
import { assertRelayAdded, getTemporaryWorkdirs, ServerWorkdirs } from './ServerTestUtils'

import {
  GsnTransactionDetails,
  RelayTransactionRequest,
  TransactionType,
  defaultEnvironment,
  sleep,
  toNumber
} from '@opengsn/common'

const TestRelayHub = artifacts.require('TestRelayHub')

contract('RelayServerIntegration', function (accounts: Truffle.Accounts) {
  const registrationRateSeconds = 500
  const alertedDelaySeconds = 0
  describe("integration", function() {
    this.slow(600000)
    it('should relay transaction', async function() {
      const relayClientConfig: Partial<GSNConfig> = {
        preferredRelays: [LocalhostOne],
        maxRelayNonceGap: 0
      }    
      console.log("accounts: ", accounts)
      const env = new ServerTestEnvironment(web3.currentProvider as HttpProvider, accounts)
      await env.init(relayClientConfig, undefined, undefined, TestRelayHub, registrationRateSeconds)
      const overrideParams: Partial<ServerConfigParams> = {
        alertedDelaySeconds
      }
      await env.newServerInstance(overrideParams, getTemporaryWorkdirs())
      await env.clearServerStorage()
      
      const overrideDetails: Partial<GsnTransactionDetails> = {}
      const req = await env.createRelayHttpRequest(overrideDetails)
      await env.relayServer._refreshGasFees()
      await env.relayServer.createRelayTransaction(req)        
    })
  })
})
