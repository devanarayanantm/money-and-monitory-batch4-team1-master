variable "resource_group_name" {
  description = "The name of the Resource Group"
  type        = string
  default     = "dev-18"
}
 
variable "location" {
  description = "Azure region where the Resource Group will be created"
  type        = string
  default     = "Central India"
}
 
variable "vnet1_location" {
  description = "Azure region for VNet1"
  type        = string
  default     = "Central India"
}
 
variable "vnet2_location" {
  description = "Azure region for VNet2"
  type        = string
  default     = "Spain Central"
}
 
