# runzeca
this is the repository of angular ca for CUI RUNZE(A0176194W) and ZHOU XUPAN(A0176236B)


public JsonResult AllocateCareGroup(AllocateCareGroupSearch parameters)
        {
            if (parameters.SelectedCareGroupTable == null || parameters.SelectedStudentTable == null)
                return JsonFailure("No records selected");

            try
            {
                AllocateCareGroupQuery acgQuery = new AllocateCareGroupQuery();
                var studentList = acgQuery.SearchStudentForAllocate(parameters)
                    .OrderBy(e => e.Gender).ThenBy(e => e.Nationality).ThenBy(e => e.Race).ThenBy(e => e.Name).ToList();
                var caregroupList = acgQuery.FetchCareGroupForAllocate(parameters);
                List<AllocateCareGroup> allocateList = new List<AllocateCareGroup>();
                AllocateCareGroup allocateRecord;
                int currentStudent = 0;
                DateTime datetime = DateTime.Now;
                string unallocatedAdmno = string.Empty;

                if (caregroupList != null && studentList.Any() && caregroupList.Count > 0)
                {
                    foreach (var group in caregroupList)
                    {
                        if (group.Vacancy > 0)
                        {
                            for (var i = 0; i < group.Vacancy; i++)
                            {
                                allocateRecord = new AllocateCareGroup
                                {
                                    CareGroupId = group.CareGroupId,
                                    CarePersonId = group.CarePersonId,
                                    AdmissionNo = studentList[currentStudent].AdmissionNo,
                                    CareGroupName = group.CareGroupName,
                                    CareGroupType = group.CareGroupType,
                                    CarePersonName = group.CarePersonName,
                                    CreatedBy = IsisContext.CurrentUser.UserId,
                                    CreatedTime = datetime,
                                    ModifiedBy = IsisContext.CurrentUser.UserId,
                                    ModifiedTime = datetime,
                                    TransactionId = Guid.NewGuid().ToString(),
                                    CreatedByEmplId = IsisContext.CurrentUser.UserId,
                                    ModifiedByEmplId = IsisContext.CurrentUser.UserId,
                                    UpdateDate = datetime,
                                    VersionNo = "1"
                                };
                                allocateList.Add(allocateRecord);

                                if (currentStudent == studentList.Count - 1)
                                {
                                    break;
                                }

                                currentStudent++;
                            }
                        }
                    }

                    AllocateCareGroupCommand acgCommand = new AllocateCareGroupCommand();
                    foreach (var record in allocateList)
                    {
                        acgCommand.Create(record, IsisContext);
                    }

                    var allStudListAdmo = studentList.Select(x => x.AdmissionNo).Distinct().ToList();
                    var allocateListAdmo = allocateList.Select(x => x.AdmissionNo).Distinct().ToList();
                    var unallocatedList = allStudListAdmo.Except(allocateListAdmo).ToList();
                    if (unallocatedList.Any())
                    {
                        unallocatedAdmno = string.Join("<br/>", unallocatedList.ToArray());
                    }
                }

                return Json(new { ok = true, msg = FramePopUpMessage(studentList, allocateList, unallocatedAdmno), newurl = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Logger.WriteErrorLog(ex.Message, "AllocateCareGroup", "AllocateCareGroup", IsisContext.CurrentUser.EmailDisplayName, IsisContext.CurrentUser.UserId);
                return Json(new { ok = false, msg = "Allocation Failed. Please refer to log", newurl = "" }, JsonRequestBehavior.AllowGet);
            }
        }
