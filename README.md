# ts-temporal
Test for temporal in typescript.

## Install

1. Install **Node.js** (v16.15) (Download/Install at [nodejs.org](https://nodejs.org/dist/latest-v16.x)). See [installation guide](https://github.com/nodejs/help/wiki/Installation).
2. Install **Yarn** (v1.\*) (Download/Install at [yarnpkg.com](https://yarnpkg.com/getting-started/install))
3. Install Dependencies

```
yarn install
```

## How to start

The temporal cluster first needs to be started with docker-compose.
In another terminal at another location do

```bash
docker-compose up
```

After launching you can check Temporal web UI at port 8088. The port can be changed by setting the env variable TEMPORAL_WEB_PORT.
Now you can launch tests using Temporal or start a worker and client.

### Start worker

yarn run worker

### Start client

yarn run client


## Test

```
yarn test
```

When trying to run the helloTestFramework test in vscode with breakpoints I get a segmentation fault :(

```
PID 45340 received SIGSEGV for address: 0x0
0   segfault-handler.node               0x00000001051dd450 _ZL16segfault_handleriP9__siginfoPv + 272
1   libsystem_platform.dylib            0x00000001981204e4 _sigtramp + 56
2   node                                0x00000001003915ac _ZN4node6loaderL23ImportModuleDynamicallyEN2v85LocalINS1_7ContextEEENS2_INS1_4DataEEENS2_INS1_5ValueEEENS2_INS1_6StringEEENS2_INS1_10FixedArrayEEE + 228
3   node                                0x000000010065d768 _ZN2v88internal7Isolate38RunHostImportModuleDynamicallyCallbackENS0_6HandleINS0_6ScriptEEENS2_INS0_6ObjectEEENS0_11MaybeHandleIS5_EE + 848
4   node                                0x0000000100a20704 _ZN2v88internal25Runtime_DynamicImportCallEiPmPNS0_7IsolateE + 272
5   node                                0x0000000100d623c4 Builtins_CEntry_Return1_DontSaveFPRegs_ArgvInRegister_NoBuiltinExit + 100
6   node                                0x0000000100df89b8 Builtins_CallRuntimeHandler + 88
7   node                                0x0000000100cec3f8 Builtins_InterpreterEntryTrampoline + 248
8   node                                0x0000000100cec3f8 Builtins_InterpreterEntryTrampoline + 248
9   node                                0x0000000100cec3f8 Builtins_InterpreterEntryTrampoline + 248
10  node                                0x0000000100cec3f8 Builtins_InterpreterEntryTrampoline + 248
11  node                                0x0000000100dac42c Builtins_PromiseConstructor + 2316
12  node                                0x0000000100ce9654 Builtins_JSBuiltinsConstructStub + 340
13  node                                0x0000000100df9398 Builtins_ConstructHandler + 664
14  node                                0x0000000100cec3f8 Builtins_InterpreterEntryTrampoline + 248
15  node                                0x0000000100cec3f8 Builtins_InterpreterEntryTrampoline + 248
16  node                                0x0000000100d1ec34 Builtins_AsyncFunctionAwaitResolveClosure + 84
17  node                                0x0000000100dae018 Builtins_PromiseFulfillReactionJob + 56
18  node                                0x0000000100d10990 Builtins_RunMicrotasks + 592
19  node                                0x0000000100cea0e4 Builtins_JSRunMicrotasksEntry + 164
20  node                                0x000000010064326c _ZN2v88internal12_GLOBAL__N_16InvokeEPNS0_7IsolateERKNS1_12InvokeParamsE + 2696
21  node                                0x0000000100643768 _ZN2v88internal12_GLOBAL__N_118InvokeWithTryCatchEPNS0_7IsolateERKNS1_12InvokeParamsE + 88
22  node                                0x0000000100643944 _ZN2v88internal9Execution16TryRunMicrotasksEPNS0_7IsolateEPNS0_14MicrotaskQueueEPNS0_11MaybeHandleINS0_6ObjectEEE + 64
23  node                                0x0000000100669ee4 _ZN2v88internal14MicrotaskQueue13RunMicrotasksEPNS0_7IsolateE + 336
24  node                                0x000000010066a77c _ZN2v88internal14MicrotaskQueue17PerformCheckpointEPNS_7IsolateE + 124
25  node                                0x0000000100311db4 _ZN4node21InternalCallbackScope5CloseEv + 388
26  node                                0x000000010031248c _ZN4node20InternalMakeCallbackEPNS_11EnvironmentEN2v85LocalINS2_6ObjectEEES5_NS3_INS2_8FunctionEEEiPNS3_INS2_5ValueEEENS_13async_contextE + 548
27  node                                0x0000000100327454 _ZN4node9AsyncWrap12MakeCallbackEN2v85LocalINS1_8FunctionEEEiPNS2_INS1_5ValueEEE + 204
28  node                                0x00000001003c8430 _ZN4node2fs13FSReqCallback7ResolveEN2v85LocalINS2_5ValueEEE + 220
29  node                                0x00000001003c8bf4 _ZN4node2fs9AfterStatEP7uv_fs_s + 72
30  node                                0x0000000100cc9ee0 uv__work_done + 192
31  node                                0x0000000100ccd67c uv__async_io + 320
```

### Replay workflow

You can easily replay and debug a workflow by running `replay.test.ts` with the correct workflowId.