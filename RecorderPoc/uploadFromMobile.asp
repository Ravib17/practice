<%@ Language=VBScript %>
<%Option Explicit%>
<!-- #include file="uploadclass.asp" -->
<%


'###############################################
'This shows how to access all files in the html element :
'Set Uploader = New FileUploader
'Uploader.Upload()
'For Each File In FileUploader.Files.Items
'    Response.Write "File Name:" & File.FileName
'    Response.Write "File Size:" & File.FileSize
'    Response.Write "File Type:" & File.ContentType
'Next

'This shows how to access file information about a specific file in the html element :
'Response.Write "File Name:" & FileUploader.Files("file1").FileName
'Response.Write "File Size:" & FileUploader.Files("file1").FileSize
'Response.Write "File Type:" & FileUploader.Files("file1").ContentType
'###############################################


'------------------------------------------------

Dim strFolder, bolUpload, strMessage
Dim httpref, lngFileSize
Dim strIncludes, strExcludes
Dim uploaderUsername, SWFFolderURL


'-----------------------------------------------
'name of folder (note there is no / at end)
'strFolder = "d:\DZHosts\LocalUser\naicu\www.avchat.somee.com\uploadscript1"
strFolder=Left(Request.ServerVariables("PATH_TRANSLATED"),InStrRev(Request.ServerVariables("PATH_TRANSLATED"),"\")) & "mobileRecordings\"

'the max size of file which can be uploaded, 0 will give unlimited file size
lngFileSize = 0

'the files to be excluded (must be in format ".aaa;.bbb")
'and must be set to blank ("") if none are to be excluded
strExcludes = ""


'-----------------------------------------------

' Create the FileUploader
Dim Uploader, File
Set Uploader = New FileUploader

' This starts the upload process
Uploader.Upload()

'******************************************
' Use [FileUploader object].Form to access 
' additional form variables submitted with
' the file upload(s). (used below)
'******************************************

' Check if any files were uploaded
If Uploader.Files.Count = 0 Then
	strMessage = "{""s"":0,""e"":""error uploading file""}"
Else
	' Loop through the uploaded files
	For Each File In Uploader.Files.Items		

		bolUpload = false		

		'Response.Write lngMaxSize
		'Response.End 

		if lngFileSize = 0 then
			bolUpload = true
		else		
			if File.FileSize > lngFileSize then
				bolUpload = false
				strMessage = "{""s"":0,""e"":""file too large""}"
			else
				bolUpload = true
			end if
		end if

		if bolUpload = true then				
		    'Check to see if file extensions are excluded
		    If strExcludes <> "" Then
				If ValidFileExtension(File.FileName, strExcludes) Then
		            strMessage = "{""s"":0,""e"":""unsupported format""}"
					bolUpload = false
				End If
			End If		
		end if

		if bolUpload = true then
			File.SaveToDisk strFolder ' Save the file			
			strMessage =  "{""s"":1,""f"":""""}"
		end if
	
	Next
	
	
	'
	Dim name
	
    name = 	Uploader.Form("txtName")    'Used to extract fields in the form
	
End If

Response.Write strMessage

'Response.Redirect ("uploadform.asp?msg=" & strMessage)

'--------------------------------------------
' ValidFileExtension()
' You give a list of file extensions that are allowed to be uploaded.
' Purpose:  Checks if the file extension is allowed
' Inputs:   strFileName -- the filename
'           strFileExtension -- the fileextensions not allowed
' Returns:  boolean
' Gives False if the file extension is NOT allowed
'--------------------------------------------
Function ValidFileExtension(strFileName, strFileExtensions)

    Dim arrExtension
    Dim strFileExtension
    Dim i
    
    strFileExtension = UCase(GetFileExtension(strFileName))
    
    arrExtension = Split(UCase(strFileExtensions), ";")
    
    For i = 0 To UBound(arrExtension)
        
        'Check to see if a "dot" exists
        If Left(arrExtension(i), 1) = "." Then
            arrExtension(i) = Replace(arrExtension(i), ".", vbNullString)
        End If
        
        'Check to see if FileExtension is allowed
        If arrExtension(i) = strFileExtension Then
            ValidFileExtension = True
            Exit Function
        End If
        
    Next
    
    ValidFileExtension = False

End Function

'--------------------------------------------
' InValidFileExtension()
' You give a list of file extensions that are not allowed.
' Purpose:  Checks if the file extension is not allowed
' Inputs:   strFileName -- the filename
'           strFileExtension -- the fileextensions that are allowed
' Returns:  boolean
' Gives False if the file extension is NOT allowed
'--------------------------------------------
Function InValidFileExtension(strFileName, strFileExtensions)

    Dim arrExtension
    Dim strFileExtension
    Dim i
        
    strFileExtension = UCase(GetFileExtension(strFileName))
    
    'Response.Write "filename : " & strFileName & "<br>"
    'Response.Write "file extension : " & strFileExtension & "<br>"    
    'Response.Write strFileExtensions & "<br>"
    'Response.End 
    
    arrExtension = Split(UCase(strFileExtensions), ";")
    
    For i = 0 To UBound(arrExtension)
        
        'Check to see if a "dot" exists
        If Left(arrExtension(i), 1) = "." Then
            arrExtension(i) = Replace(arrExtension(i), ".", vbNullString)
        End If
        
        'Check to see if FileExtension is not allowed
        If arrExtension(i) = strFileExtension Then
            InValidFileExtension = False
            Exit Function
        End If
        
    Next
    
    InValidFileExtension = True

End Function

'--------------------------------------------
' GetFileExtension()
' Purpose:  Returns the extension of a filename
' Inputs:   strFileName     -- string containing the filename
'           varContent      -- variant containing the filedata
' Outputs:  a string containing the fileextension
'--------------------------------------------
Function GetFileExtension(strFileName)

    GetFileExtension = Mid(strFileName, InStrRev(strFileName, ".") + 1)
    
End Function

%>

