package kr.co.shareCal.service.file;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileUploadUtil {
	private static Map<String, MediaType>MediaMap;
	
	static {
		MediaMap = new HashMap<String, MediaType>();
		MediaMap.put("JPG", MediaType.IMAGE_JPEG);
		MediaMap.put("PNG", MediaType.IMAGE_PNG);
		MediaMap.put("GIF", MediaType.IMAGE_GIF);
	}
	
	public static MediaType getMediaType(String type) {
		return MediaMap.get(type.toUpperCase());
	}
	
	public static String uploadFile(String userid, String content, String realPath, String originalName, byte[] fileData) throws IOException {
		log.info("FileUploadUtil.uploadFile 호출 : " + realPath + "(" + originalName + ")");
		UUID uuid = UUID.randomUUID();
		String saveName = uuid.toString() + "_" + originalName;
		String savePath = userPath(userid, content, realPath);
		File target = new File(realPath + File.separator + savePath, saveName);
		
		FileCopyUtils.copy(fileData, target);
		
		String formatName = originalName.substring(originalName.lastIndexOf(".") + 1);
		String uploadedFileName = null;
		if(getMediaType(formatName)!=null && content.equals("photo")) {
			uploadedFileName = makeThumbnail(realPath, savePath, saveName, 100, 100, "photo");
		} else {
			uploadedFileName = savePath + File.separator + saveName;
		}
		
		return uploadedFileName;
	}
	
	public static String uploadtoJson(String userid, String content, MultipartHttpServletRequest request, String realPath, String originalName, byte[] fileData) throws IOException {
		log.info("FileUploadUtil.uploadFile 호출 : " + realPath + "(" + originalName + ")");
		UUID uuid = UUID.randomUUID();
		String saveName = uuid.toString() + "_" + originalName;
		String savePath = userPath(userid, content, realPath);
		File target = new File(realPath + File.separator + savePath, saveName);
		FileCopyUtils.copy(fileData, target);
		String formatName = originalName.substring(originalName.lastIndexOf(".") + 1);
		String contextPath = request.getContextPath();
		String uploadFileName = null;
		if(getMediaType(formatName)!=null && content.equals("profile")) {
			uploadFileName = makeThumbnail(realPath, savePath, saveName, 100, 100, "thumb");
			makeThumbnail(realPath, savePath, saveName, 50, 50, "min");
		}else {
			uploadFileName = contextPath + "/upload/" + saveName;			
		}
		return uploadFileName;
	}
	
	private static void makeDir(String realPath, String... paths) {
		if(new File(realPath + paths[paths.length - 1]).exists()) {
			return;
		}
		for(String path : paths) {
			File dirPath = new File(realPath + path);
			if(!dirPath.exists()) {
				dirPath.mkdir();
			}
		}
	}
	
	private static String userPath(String userid, String content, String realPath) {
		String userPath = File.separator + userid.split("[@|.]")[0] + "_" + userid.split("[@|.]")[1];
		String contentPath = userPath + File.separator + content;
		
		makeDir(realPath, userPath, contentPath);
		
		log.info("폴더 경로 : " + contentPath);
		return contentPath;
		
	}
	
	public static String makeThumbnail(String realPath, String path, String fileName, int height, int width, String header) throws IOException {
		BufferedImage sourseImg = ImageIO.read(new File(realPath + path, fileName));
		
		int oh = sourseImg.getHeight();
		int ow = sourseImg.getWidth();
		
		int nh = oh;
		int nw = (oh * width)/height;
		if(nh > oh) {
			nh = (ow * height)/width;
			nw = ow;			
		}
		
		BufferedImage cropImage = Scalr.crop(sourseImg, (ow-nw)/2, (oh-nh)/2, nw, nh);
		BufferedImage destImage = Scalr.resize(cropImage, width, height);
		String thumbnailName = null;
		
		thumbnailName = realPath + path + File.separator + header + "_" + fileName;
		
		String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
		
		File thumbFile = new File(thumbnailName);
		ImageIO.write(destImage, formatName.toUpperCase(), thumbFile);
		
		return thumbnailName.substring(realPath.length()).replace(File.separatorChar, '/');
	}
	
}
