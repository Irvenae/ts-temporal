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
0   segfault-handler.node               0x000000010cc91458 _ZL16segfault_handleriP9__siginfoPv + 272
1   libsystem_platform.dylib            0x00000001b63384e4 _sigtramp + 56
2   node                                0x00000001000e5a88 _ZN4node6loaderL23ImportModuleDynamicallyEN2v85LocalINS1_7ContextEEENS2_INS1_14ScriptOrModuleEEENS2_INS1_6StringEEENS2_INS1_10FixedArrayEEE + 236
3   node                                0x000000010038f67c _ZN2v88internal7Isolate38RunHostImportModuleDynamicallyCallbackENS0_6HandleINS0_6ScriptEEENS2_INS0_6ObjectEEENS0_11MaybeHandleIS5_EE + 248
4   node                                0x0000000100704e14 _ZN2v88internal25Runtime_DynamicImportCallEiPmPNS0_7IsolateE + 396
5   node                                0x0000000100a14a04 Builtins_CEntry_Return1_DontSaveFPRegs_ArgvInRegister_NoBuiltinExit + 100
6   node                                0x0000000100aa2dd8 Builtins_CallRuntimeHandler + 88
7   node                                0x00000001009a8418 Builtins_InterpreterEntryTrampoline + 248
8   node                                0x00000001009a8418 Builtins_InterpreterEntryTrampoline + 248
9   node                                0x00000001009a8418 Builtins_InterpreterEntryTrampoline + 248
10  node                                0x00000001009a8418 Builtins_InterpreterEntryTrampoline + 248
11  node                                0x0000000100a5ae00 Builtins_PromiseConstructor + 2176
12  node                                0x00000001009a5650 Builtins_JSBuiltinsConstructStub + 368
13  node                                0x0000000100aa3770 Builtins_ConstructHandler + 656
14  node                                0x00000001009a8418 Builtins_InterpreterEntryTrampoline + 248
15  node                                0x00000001009a8418 Builtins_InterpreterEntryTrampoline + 248
16  node                                0x00000001009d7a14 Builtins_AsyncFunctionAwaitResolveClosure + 84
17  node                                0x0000000100a5c8b8 Builtins_PromiseFulfillReactionJob + 56
18  node                                0x00000001009c9df4 Builtins_RunMicrotasks + 596
19  node                                0x00000001009a60e4 Builtins_JSRunMicrotasksEntry + 164
20  node                                0x0000000100377a1c _ZN2v88internal12_GLOBAL__N_16InvokeEPNS0_7IsolateERKNS1_12InvokeParamsE + 2332
21  node                                0x0000000100377e50 _ZN2v88internal12_GLOBAL__N_118InvokeWithTryCatchEPNS0_7IsolateERKNS1_12InvokeParamsE + 88
22  node                                0x0000000100377f3c _ZN2v88internal9Execution16TryRunMicrotasksEPNS0_7IsolateEPNS0_14MicrotaskQueueEPNS0_11MaybeHandleINS0_6ObjectEEE + 64
23  node                                0x000000010039ab78 _ZN2v88internal14MicrotaskQueue13RunMicrotasksEPNS0_7IsolateE + 336
24  node                                0x000000010039b40c _ZN2v88internal14MicrotaskQueue17PerformCheckpointEPNS_7IsolateE + 124
25  node                                0x0000000100065db4 _ZN4node21InternalCallbackScope5CloseEv + 388
26  node                                0x000000010006648c _ZN4node20InternalMakeCallbackEPNS_11EnvironmentEN2v85LocalINS2_6ObjectEEES5_NS3_INS2_8FunctionEEEiPNS3_INS2_5ValueEEENS_13async_contextE + 548
27  node                                0x0000000100066774 _ZN4node12MakeCallbackEPN2v87IsolateENS0_5LocalINS0_6ObjectEEENS3_INS0_8FunctionEEEiPNS3_INS0_5ValueEEENS_13async_contextE + 180
28  node                                0x00000001000c12c4 _ZN4node11Environment14CheckImmediateEP10uv_check_s + 160
29  node                                0x0000000100990674 uv__run_check + 152
30  node                                0x000000010098a3d0 uv_run + 396
31  node                                0x0000000100066ccc _ZN4node13SpinEventLoopEPNS_11EnvironmentE + 244
```

### Replay workflow

You can easily replay and debug a workflow by running `replay.test.ts` with the correct workflowId.