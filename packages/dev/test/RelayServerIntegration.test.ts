import { HttpProvider } from 'web3-core'
import { GSNConfig } from '@opengsn/provider/dist/GSNConfigurator'
import { ServerConfigParams } from '@opengsn/relay/dist/ServerConfigParams'
import { LocalhostOne, ServerTestEnvironment } from './ServerTestEnvironment'

import {
  GsnTransactionDetails,
  RelayTransactionRequest,
  TransactionType,
  defaultEnvironment,
  sleep,
  toNumber
} from '@opengsn/common'

describe('RelayServerIntegration', function (accounts: Truffle.Accounts) {
  const alertedDelaySeconds = 0
  it('should relay transaction', async function() {
    const relayClientConfig: Partial<GSNConfig> = {
      preferredRelays: [LocalhostOne],
      maxRelayNonceGap: 0
    }    
    console.log("I am here!")
    const env = new ServerTestEnvironment(web3.currentProvider as HttpProvider, accounts)
    await env.init(relayClientConfig, undefined, undefined, TestRelayHub, registrationRateSeconds)
    const overrideParams: Partial<ServerConfigParams> = {
      alertedDelaySeconds
    }
    await env.newServerInstance(overrideParams)
    await env.clearServerStorage()
    
    const overrideDetails: Partial<GsnTransactionDetails> = {}
    await sleep(20000)
    const req = await env.createRelayHttpRequest(overrideDetails)
    await env.relayServer._refreshGasFees()
    await env.relayServer.createRelayTransaction(req)        
  })
})
