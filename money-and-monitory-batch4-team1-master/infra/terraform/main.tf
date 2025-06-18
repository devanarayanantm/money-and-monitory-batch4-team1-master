resource "azurerm_resource_group" "myrg" {
  name     = var.resource_group_name
  location = var.location
}
 
resource "azurerm_container_registry" "acr" {
  name                     = "devanecommerceacr"
  resource_group_name      = azurerm_resource_group.myrg.name
  location                 = azurerm_resource_group.myrg.location
  sku                      = "Standard"
  admin_enabled            = true
 
  identity {
    type = "SystemAssigned"
  }
 
  depends_on = [azurerm_resource_group.myrg]
}
 
# VNet 1 in East US
resource "azurerm_virtual_network" "vnet1" {
  name                = "vnet1"
  address_space       = ["10.10.0.0/16"]
  location            = var.vnet1_location
  resource_group_name = var.resource_group_name
  depends_on          = [azurerm_resource_group.myrg]
}
 
resource "azurerm_subnet" "vnet1_subnet1" {
  name                 = "vnet1-subnet1"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.vnet1.name
  address_prefixes     = ["10.10.1.0/24"]
  depends_on          = [azurerm_virtual_network.vnet1]
}
 
resource "azurerm_subnet" "vnet1_subnet2" {
  name                 = "vnet1-subnet2"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.vnet1.name
  address_prefixes     = ["10.10.2.0/24"]
  depends_on          = [azurerm_virtual_network.vnet1]
}
 
# VNet 2 in West Europe
resource "azurerm_virtual_network" "vnet2" {
  name                = "vnet2"
  address_space       = ["10.20.0.0/16"]
  location            = var.vnet2_location
  resource_group_name = var.resource_group_name
  depends_on          = [azurerm_resource_group.myrg]
}
 
resource "azurerm_subnet" "vnet2_subnet1" {
  name                 = "vnet2-subnet1"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.vnet2.name
  address_prefixes     = ["10.20.1.0/24"]
  depends_on          = [azurerm_virtual_network.vnet2]
}
 
resource "azurerm_subnet" "vnet2_subnet2" {
  name                 = "vnet2-subnet2"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.vnet2.name
  address_prefixes     = ["10.20.2.0/24"]
  depends_on          = [azurerm_virtual_network.vnet2]
}
