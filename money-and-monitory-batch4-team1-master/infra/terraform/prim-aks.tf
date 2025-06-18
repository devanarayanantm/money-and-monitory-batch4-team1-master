resource "azurerm_kubernetes_cluster" "aks" {
  name                = "dev-aks1"
  location            = var.vnet1_location
  resource_group_name = var.resource_group_name
  dns_prefix          = "devaks1"

  default_node_pool {
    name                = "primarynp1"
    node_count          = 2
    vm_size             = "Standard_B2s"
    vnet_subnet_id      = azurerm_subnet.vnet1_subnet1.id
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin     = "azure"
    load_balancer_sku  = "standard"
    network_policy     = "azure"
  }

  depends_on           = [azurerm_subnet.vnet1_subnet1]
}

resource "azurerm_kubernetes_cluster_node_pool" "usernp" {
  name                  = "primarynp2"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.aks.id
  vm_size               = "Standard_B2s"
  node_count            = 2
  mode                  = "User"
  vnet_subnet_id        = azurerm_subnet.vnet1_subnet2.id
  orchestrator_version  = azurerm_kubernetes_cluster.aks.kubernetes_version

  depends_on            = [azurerm_subnet.vnet1_subnet2,azurerm_kubernetes_cluster.aks]
}
