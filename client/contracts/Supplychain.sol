// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract SupplyChain{

   struct ProductDetail {
        string Product_ID;
        address addr;
        string name;
        string price;
        string Categeroy;
        string CNIC;
        string email;
        bool isUserLoggedIn;
    }   
   struct SupplierDetail {
        string supplier_ID;
        address addr;
        string name;
        string phone;
        string addres;
        bool isUserLoggedIn;
    }

  struct DistributorDetail {
        string distributor_ID;
        address addr;
        string name;
        string phone;
        string addres;
        bool isUserLoggedIn;
    }
    mapping(string => SupplierDetail) public Supplier;
    mapping(string => ProductDetail) public Product;
    mapping(string => DistributorDetail ) public Distributor;
//Supplier
function registerS(
        string memory _supplier_ID,
        string memory _name,
        string memory _phone,
        string memory _addres
    ) public returns (bool) {
        require(keccak256(bytes(Supplier[_supplier_ID].supplier_ID )) !=  keccak256(bytes(_supplier_ID)));
        Supplier[_supplier_ID].phone = _phone;
        Supplier[_supplier_ID].addres=_addres;
        Supplier[_supplier_ID].name = _name;
        return true;
    }
//Manufacture
function registerM(
        string memory _Product_ID,
        string memory _name,
        string memory _categegory,
        string memory _price
    ) public returns (bool) {
        require(keccak256(bytes(Product[_Product_ID].Product_ID )) !=  keccak256(bytes(_Product_ID)));
        Product[_Product_ID].name = _name;
        Product[_Product_ID].Categeroy = _categegory;
        Product[_Product_ID].price =_price;
        Product[_Product_ID].isUserLoggedIn = false;
        return true;
    }

    //Distributor
    function registerD(
        string memory _Distributor_ID,
        string memory _name,
        string memory _phone,
        string memory _addres
    ) public returns (bool) {
        require(keccak256(bytes(Distributor[_Distributor_ID].distributor_ID )) !=  keccak256(bytes(_Distributor_ID)));
        Distributor[_Distributor_ID].name = _name;
        Distributor[_Distributor_ID].phone = _phone;
        Distributor[_Distributor_ID].addres =_addres;
        Distributor[_Distributor_ID].isUserLoggedIn = false;
        return true;
    }

}

  

