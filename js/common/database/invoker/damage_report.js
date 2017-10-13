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

	this.getDamageTypes = function()
	{
		return mockCommunicator.getPerils();
	}

	// ---------------------------

	this.getDamageReport = function(brokerId, businessUnitName, farmName)
	{
		var finalDamageReport = [];

		var damageReports = mockCommunicator.getDamageReports();

		for(var i = 0; i < damageReports.length; i++)
		{
			damageReports[i]["damageType"] = mockCommunicator.getDamageType(damageReports[i].damageTypeId);

			damageReports[i]["damageReportLandEntries"] = mockCommunicator.getDamageReportLandEntriesByDamageReportId(damageReports[i].id);
			
			var damageReportLandEntries = damageReports[i].damageReportLandEntries;
			for(var j = 0; j < damageReportLandEntries.length; j++)
			{
				damageReportLandEntries[j]["policyLandEntry"] = mockCommunicator.getPolicyLandEntry(damageReportLandEntries[j].policyLandEntryId);

				var landEntry = damageReportLandEntries[j].policyLandEntry;

				landEntry["policy"] = mockCommunicator.getPolicy(landEntry.policyId);
				landEntry.policy["businessUnit"] = mockCommunicator.getBusinessUnit(landEntry.policy.businessUnitId);

				landEntry["crop"] = mockCommunicator.getCrop(landEntry.cropId);

				landEntry["farm"] = mockCommunicator.getFarm(landEntry.farmId);

				landEntry["policyLandEntryDamageTypes"] = mockCommunicator.getPolicyLandEntryDamageTypesByPolicyLandEntryId(landEntry.id);

				for(var k = 0; k < landEntry.policyLandEntryDamageTypes.length; k++)
				{
					var policyLandEntryDamageType =  landEntry.policyLandEntryDamageTypes[k];
					policyLandEntryDamageType["tariffOptionDamageType"] = mockCommunicator.getTariffOptionDamageType(policyLandEntryDamageType.tariffOptionDamageTypeId);

					var tariffOptionDamageType = policyLandEntryDamageType.tariffOptionDamageType;

					tariffOptionDamageType["tariffOption"] = mockCommunicator.getTariffOption(tariffOptionDamageType.tariffOptionId);

					var tariffOption = tariffOptionDamageType.tariffOption;

					tariffOption["crop"] = mockCommunicator.getCrop(tariffOption.cropId); 
				}
			}
		}
		
		for(var i = 0; i < damageReports.length; i++)
		{
			var acceptableLandEntries = [];

			for(var j = 0; j < damageReports[i].damageReportLandEntries.length; j++)
			{
				var landEntry = damageReports[i].damageReportLandEntries[j].policyLandEntry;

				if(landEntry.policy.brokerId == brokerId)
				{
					if(businessUnitName == "" && farmName == "")
					{
						//finalDamageReport.push(damageReports[i]);
						acceptableLandEntries.push(damageReports[i].damageReportLandEntries[j]);
					}
					else if(businessUnitName != "" && farmName == "")
					{
						if(landEntry.policy.businessUnit.name == businessUnitName)
						{
							//finalDamageReport.push(damageReports[i]);
							acceptableLandEntries.push(damageReports[i].damageReportLandEntries[j]);
						}
					}
					else if(businessUnitName == "" && farmName != "")
					{
						if(landEntry.farm.name == farmName)
						{
							//finalDamageReport.push(damageReports[i]);
							acceptableLandEntries.push(damageReports[i].damageReportLandEntries[j]);
						}
					}
					else
					{
						if(landEntry.policy.businessUnit.name == businessUnitName && landEntry.farm.name == farmName)
						{
							//finalDamageReport.push(damageReports[i]);
							acceptableLandEntries.push(damageReports[i].damageReportLandEntries[j]);
						}
					}
				}
				/*else
				{
					debugger;
					//delete damageReports[i].damageReportLandEntries[j];
					var damageReportLandEntry = damageReports[i].damageReportLandEntries[j];
					var splicedArr = damageReports[i].damageReportLandEntries.splice(damageReportLandEntry, 1);
					if(splicedArr.length > 1)
					{
						damageReports[i].damageReportLandEntries = splicedArr;
					}
					else
					{
						damageReports[i].damageReportLandEntries = [];
						damageReports[i].damageReportLandEntries.push(splicedArr);
					}
					//damageReports[i].damageReportLandEntries.splice(j, 1);
				}*/
			}

			damageReports[i].damageReportLandEntries = acceptableLandEntries;

			if(damageReports[i].damageReportLandEntries.length > 0)
			{
				finalDamageReport.push(damageReports[i]);
			}
		}
		
		return finalDamageReport;

		/*var tDamageReports = [];

		var damageReport = {
			'id':'0',
			'damageTypeId':0,
			'damageReportNumber':'00000',
			'dateOfDamage':'2017/05/11',
			'dateOfReporting':'2017/05/11',
		};

		damageReport["damageType"] = {
			'id':'0',
			'name':'Fire'
		};

		damageReport["damageReportLandEntries"] = [
			{
				'id':'0',
				'damageReportId':0,
				'policyLandEntryId':0,
				'policyLandEntry': {
					'id':'0',
					'policyId':'0',
					'policy': {
						'id':'0',
						'policyNumber':'00000',
						'businessUnitId':'0',
						'businessUnit':{
							'id':'0',
							'name':'BU0',   //'Anro Boerdery Co (ABC)',
							'contactNumber':'063-887-9635',
							'contactPerson':'Anro Swart',
							'email':'anro.swart@bing.com',
							'vatNumber':'00625-4811',
							'incomeTaxNumber':'5651484166',
							'active':'1',
							'verified':'1'
						},
						'brokerId':'0',
						'insurerId':null,
						'acceptedOn':'2017-08-30 19:01:05',
						'active':'1',
						'linkedToPolicyId':null
					},
					'farmId':'0',
					'farm':{
						'id':'0',
						'name':'P0',
						'businessUnitId':'0',
						'latitude':'1.22644',
						'longitude':'-0.35428',
						'active':'1',
						'districtId':'0'
					},
					'landNumber':'00001',
					'landLongitude':'131.044',
					'landLatitude':'-25.363',
					'cropId':'1',
					'crop':{
						'id':'1',
						'name':'Banana',
						'productId':'0',
						'active':'1',
						'priceUomId':'0',
						'areaUomId':'0'
					},
					'cultivar':'Red Dwarf',
					'area':'7.4',
					'yield':'14.22',
					'price':'5.48',
					'tariffOptionId':'0'
				}
			},
			{
				'id':'1',
				'damageReportId':0,
				'policyLandEntryId':1,
				'policyLandEntry' : {
					'id':'1',
					'policyId':'0',
					'policy': {
						'id':'0',
						'policyNumber':'00000',
						'businessUnitId':'0',
						'businessUnit':{
							'id':'0',
							'name':'BU0',   //'Anro Boerdery Co (ABC)',
							'contactNumber':'063-887-9635',
							'contactPerson':'Anro Swart',
							'email':'anro.swart@bing.com',
							'vatNumber':'00625-4811',
							'incomeTaxNumber':'5651484166',
							'active':'1',
							'verified':'1'
						},
						'brokerId':'0',
						'insurerId':null,
						'acceptedOn':'2017-08-30 19:01:05',
						'active':'1',
						'linkedToPolicyId':null
					},
					'farmId':'1',
					'farm':{
						'id':'1',
						'name':'P1',
						'businessUnitId':'0',
						'latitude':'1.325642',
						'longitude':'-0.35243',
						'active':'1',
						'districtId':'0'
					},
					'landNumber':'00002',
					'landLongitude':'131.044',
					'landLatitude':'-25.363',
					'cropId':'1',
					'crop':{
						'id':'1',
						'name':'Banana',
						'productId':'0',
						'active':'1',
						'priceUomId':'0',
						'areaUomId':'0'
					},
					'cultivar':'Something',
					'area':'8.4',
					'yield':'16.11',
					'price':'9.48',
					'tariffOptionId':'0'
				}
			}
		];		

		tDamageReports.push(damageReport);

		return tDamageReports;*/

		/*var tDamageReports = [];

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

		return tDamageReports;*/
	}

	function getFullDamageReport(damageReport)
	{
		/*damageReport["damageReportDamageTypes"] = mockCommunicator.getDamageReportDamageTypesByDamageReportId(damageReport.id);

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

		return damageReport;*/
	}

	this.createDamageReport = function(damageReport)
	{
		var damageReportId = mockCommunicator.createDamageReport(damageReport);

		if(damageReportId == null)
		{
			return;
		}

		for(var i = 0; i < damageReport.damageReportLandEntries.length; i++)
		{
			var tObj = {
				"damageReportId":damageReportId,
				"policyLandEntryId":damageReport.damageReportLandEntries[i]["id"],
				"requiresTaxation":damageReport.damageReportLandEntries[i]["requiresTaxation"],
			};
			mockCommunicator.createDamageReportLandEntry(tObj);
			console.log(tObj);
		}
		
		return damageReportId;
	}
}