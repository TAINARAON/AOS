var damageReportInvoker = new function()
{
	this.getBusinessUnitByBrokerId = function(brokerId)
	{
		// get quiries which has this broker id
		var policies = mockCommunicator.getPolicyByBrokerId(brokerId);
		// return business units of those quiries
		var businessUnits = [];

		for(var i = 0; i < policies.length; i++)
		{
			var businessUnit = mockCommunicator.getBusinessUnit(policies[i].businessUnitId);

			if(!businessUnits.some(item => item === businessUnit))
			{
				businessUnits.push(businessUnit);
			}
		}

		return businessUnits;
	}

	this.getFarmByBusinessUnitId = function(brokerId, businessUnitId)
	{
		var tempFarms = [];
		debugger;
		var policies = mockCommunicator.getPolicyByBrokerId(brokerId);

		for(var i = 0; i < policies.length; i++)
		{
			if(policies[i].businessUnitId == businessUnitId)
			{
				var landEntries = mockCommunicator.getPolicyLandEntriesByPolicyId(policies[i].id);
				for(var j = 0; j < landEntries.length; j++)
				{
					var farm = mockCommunicator.getFarm(landEntries[j].farmId);

					/*if(tempFarms.length == 0)
					{
						tempFarms.push(farm);
					}*/

					/*if(farms.some(item => item.id != farm.id && item.name != farm.name))
					{
						farms.push(farm);
					}*/
					/*for(var k = 0; k < tempFarms.length; k++)
					{
						var tFarm = tempFarms[k];
						if(tFarm.name != farm.name && tFarm.id != farm.id)
						{
							tempFarms.push(farm);
						}
					}*/
					/*var alreadyIn = false;
					for(var i = 0; i < tempFarms.length; i++)
					{
						var tFarm = tempFarms[i];
						if(tFarm.name != farm.name && tFarm.id != farm.id)
						{
							alreadyIn = true;
						}
					}

					if(!alreadyIn)
					{
						tempFarms.push(farm);
					}*/

					if(tempFarms.length == 0)
					{
						tempFarms.push(farm);
					}

					if(tempFarms.some(item => item.name === farm.name))
					{
					}
					else
					{
						tempFarms.push(farm);
					}
				}
			}
		}

		return tempFarms;
	}

	this.getLandByFarmId = function(brokerId, businessUnitId, farmId)
	{
		var tLandEntries = [];
		
		var policies = mockCommunicator.getPolicyByBrokerId(brokerId);

		for(var i = 0; i < policies.length; i++)
		{
			if(policies[i].businessUnitId == businessUnitId)
			{
				var landEntries = mockCommunicator.getPolicyLandEntriesByPolicyId(policies[i].id);
				for(var j = 0; j < landEntries.length; j++)
				{
					var farm = mockCommunicator.getFarm(landEntries[j].farmId);

					if(farm.id == farmId)
					{
						tLandEntries.push(landEntries[j]);
					}
				}
			}
		}

		return tLandEntries;
	}

	// ---------------------------

	this.getDamageReport = function(brokerId, businessUnitName, farmName)
	{
		var tDamageReports = [];

		var damageReports = mockCommunicator.getDamageReports();

		for(var i = 0; i < damageReports.length; i++)
		{
			var damageReport = getFullDamageReport(damageReports[i]);
			
			if(brokerId == damageReport.policyLandEntry.policy.brokerId)
			{
				if(businessUnitName == "" && farmName == "")
				{
					tDamageReports.push(damageReport);
				}
				else if(businessUnitName != "" && farmName == "")
				{
					if(damageReport.policyLandEntry.policy.businessUnit.name == businessUnitName)
					{
						tDamageReports.push(damageReport);
					}
				}
				else if(businessUnitName == "" && farmName != "")
				{
					if(damageReport.policyLandEntry.farm.name == farmName)
					{
						tDamageReports.push(damageReport);
					}
				}
				else
				{
					if(damageReport.policyLandEntry.policy.businessUnit.name == businessUnitName && damageReport.policyLandEntry.farm.name == farmName)
					{
						tDamageReports.push(damageReport);
					}
				}
			}

		}

		return tDamageReports;

		/*var landEntries = [];

		var policies = policyInvoker.searchForPolicy(brokerId, "", businessUnitName);

		var damageReports = mockCommunicator.getDamageReports();

		for(var k = 0; k < policies.length; k++)
		{
			var policy = policies[k];
			for(var j = 0; j < policy.policyLandEntries.length; j++)
			{
				var landEntry = policy.policyLandEntries[j];

				for(var i = 0; i < damageReports.length; i++)
				{
					if(landEntry.id == damageReports[i].policyLandEntryId)
					{
						if(farmName != "")
						{
							if(farmName == landEntry.farm.name)
							{
								landEntry["damageReport"] = getFullDamageReport(damageReports[i]);
								landEntries.push(landEntry);
							}
						}
						else
						{
							landEntry["damageReport"] = getFullDamageReport(damageReports[i]);
							landEntries.push(landEntry);
						}
					}		
				}
			}
		}
		debugger;
		return landEntries;*/
	}

	function getFullDamageReport(damageReport)
	{
		damageReport["damageReportDamageTypes"] = mockCommunicator.getDamageReportDamageTypesByDamageReportId(damageReport.id);

		for(var i = 0; i < damageReport.damageReportDamageTypes.length; i++)
		{
			var damageReportDamageType = damageReport.damageReportDamageTypes[i];

			damageReportDamageType["damageType"] = mockCommunicator.getDamageType(damageReportDamageType.damageTypeId);
		}

		damageReport["policyLandEntry"] = mockCommunicator.getPolicyLandEntry(damageReport.policyLandEntryId);

		damageReport.policyLandEntry["farm"] = mockCommunicator.getFarm(damageReport.policyLandEntry.farmId);

		damageReport.policyLandEntry["policy"] = mockCommunicator.getPolicy(damageReport.policyLandEntry.policyId);

		damageReport.policyLandEntry.policy["businessUnit"] = mockCommunicator.getBusinessUnit(damageReport.policyLandEntry.policy.businessUnitId);

		damageReport.policyLandEntry["policyLandEntryDamageTypes"] = mockCommunicator.getPolicyLandEntryDamageTypesByPolicyLandEntryId(damageReport.policyLandEntry.id);

		for(var i = 0; i < damageReport.policyLandEntry.policyLandEntryDamageTypes.length; i++)
		{
			var policyLandEntryDamageType = damageReport.policyLandEntry.policyLandEntryDamageTypes[i];

			policyLandEntryDamageType["tariffOptionDamageType"] =  mockCommunicator.getTariffOptionDamageType(policyLandEntryDamageType.tariffOptionDamageTypeId);

			policyLandEntryDamageType.tariffOptionDamageType["damageType"] = mockCommunicator.getDamageType(policyLandEntryDamageType.tariffOptionDamageType.damageTypeId);
		}		

		return damageReport;
	}
}