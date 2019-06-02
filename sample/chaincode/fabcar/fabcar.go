/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * The sample smart contract for documentation topic:
 * Writing Your First Blockchain Application
 */

package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the car structure, with 4 properties.  Structure tags are used by encoding/json library

type Identity struct {
	Name     String 'json:"name"'
	Phone    String 'json:"phone"'
	Address  String 'json:"address"'
	Password String 'json:"password"'
}

/*
 * The Init method is called when the Smart Contract "fabcar" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryCar" {
		return s.queryId(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "createId" {
		return s.createId(APIstub, args)
	} else if function == "queryAllIds" {
		return s.queryAllIds(APIstub)
	} else if function == "changeCarOwner" { //쓸 일 없을 것 같은데
		return s.changeCarOwner(APIstub, args)
	} else if function == "deleteId"{
		return s.deleteId(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

//-----------------------------------------------------------------------
func (s *SmartContract) queryId(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	idAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(idAsBytes)
}


//-----------------------------------------------------------------------
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	fmt.Println("ledger initiated")
	return shim.Success(nil)
}


//-----------------------------------------------------------------------
func (s *SmartContract) createId(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var id = Identity{Name: args[1], Phone: args[2], Birth: args[3], Address: args[4], Password: args[5]}

	idAsBytes, _ := json.Marshal(id)
	APIstub.PutState(args[0], idAsBytes)

	return shim.Success(nil)
}



//-----------------------------------------------------------------------
func (s *SmartContract) queryAllIds(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "ID0" //학번을 key값으로 하고 싶었는데 그러면 전체 출력이 힘들어지네
	endKey := "ID999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllIds:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

//-----------------------------------------------------------------------
func (s *SmartContract) deleteId(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1{
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	idName := args[0]

	//삭제를 어떻게 구현할 것인가?
	//삭제 및 업데이트 과정에 대해 고려해 볼 것

//	var jsonResp string
//	idAsbytes, err := APIstub.GetState(idName)
//	if err != nil{
//		jsonResp = "{\"Error\":\"Failed to get state for " + idName + "\"}"
//		return shim.Error(jsonResp)
//	} else if idAsbytes == nil{
//		jsonResp = "{\"Error\":\"Id does not exist: " + idName + "\"}"
//		return shim.Error(jsonResp)
//	}

//	var idJSON Identity
//	err = json.Unmarshal([]byte(idAsbytes), &idJSON)
//	if err != nil{
//		jsonResp = "{\"Error\":\"Failed to decode JSON of: " + idName + "\"}"
//		return shim.Error(jsonResp)
//	}

//	err = APIstub.DelState(idName)
//	if err != nil{
//		return shim.Error("Failed to delete state:" + err.Error())
//	}

	return shim.Success(nil)
}



//-----------------------------------------------------------------------
func (s *SmartContract) changeCarOwner(APIstub shim.ChaincodeStubInterface, args []string) sc.Response { //필요?

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	carAsBytes, _ := APIstub.GetState(args[0])
	car := Car{}

	json.Unmarshal(carAsBytes, &car)
	car.Owner = args[1]

	carAsBytes, _ = json.Marshal(car)
	APIstub.PutState(args[0], carAsBytes)

	return shim.Success(nil)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
