export async function uploadFileToPinata(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload to Pinata");
  }

  const data = await res.json();
  const cid = data.IpfsHash;

  // คืนค่า URL ที่สามารถเข้าถึงไฟล์จาก IPFS
  return `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`;
}

export async function deleteFileFromPinata(ipfsHash: string) {
  const res = await fetch(
    "https://api.pinata.cloud/pinning/unpin/" + ipfsHash,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete file from Pinata");
  }

  return true;
}
