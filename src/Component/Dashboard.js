import React, { useState, useEffect } from "react";
import ContractList from "./ContractList";
import ContractModal from "./ContractModal";
import AddContractModal from "./AddContractModal";
import { contractStatus, mockContracts } from "./mockData";

const Dashboard = () => {
  const [contracts, setContracts] = useState(mockContracts);
  const [selectedContract, setSelectedContract] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleEditContract = (contract) => {
    setSelectedContract(contract);
    setModalOpen(true);
  };

  const handleSaveContract = (contract) => {
    setContracts(contracts.map((c) => (c.id === contract.id ? contract : c)));
  };

  const handleAddContract = () => {
    setAddModalOpen(true);
  };

  const handleAddNewContract = (contract) => {
    setContracts([...contracts, contract]);
    setAddModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setContracts((prevContracts) => {
        return prevContracts.map((contract) => {
          if (Math.random() > 0.8 && contract.status === "Draft") {
            return { ...contract, status: "Finalized" };
          }
          return contract;
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [contracts]);

  return (
    <div>
      <ContractList
        contracts={contracts}
        onEditContract={handleEditContract}
        onAddContract={handleAddContract}
      />
      <ContractModal
        open={modalOpen}
        contract={selectedContract}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveContract}
      />
      <AddContractModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddNewContract}
      />
    </div>
  );
};

export default Dashboard;
