// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract TennisNFT {
    // Token name
    bytes32 private _name;
    string s;

    // Token symbol
    bytes32 private _symbol;

    struct player {

        address owner;
        string URI;
    }
    player newPlayer;

    //mapping(string => uint256)private _playername;

    mapping(uint256 => player) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;


    event Transfer(address from, address to, uint256 tokenId);

    event Approval(address owner, address approved, uint256 tokenId);

    event ApprovalForAll(address owner, address operator, address approved);


    constructor(){
        _name = "playerNFT";
        _symbol = "pltn";
    }

    //


    function name() external pure returns (bytes32){
        return bytes32 ("playerNFT");
    }

    function symbol() external view returns (bytes32){
        return _symbol;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory){
        return _owners[tokenId].URI;
    }

    function balanceOf(address owne) public view  returns (uint256) {
        //require(owne != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owne];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owne = _owners[tokenId].owner;
        // require(owne != address(0), "ERC721: invalid token ID");
        return owne;
    }

    modifier approve(address to, uint256 tokenId) {
        address owne = ownerOf(tokenId);
        require(to != owne, "ERC721: approval to current owner");

        require(
            msg.sender == owne || isApprovedForAll(owne, msg.sender),
            "ERC721: approve caller is not token owner or approved for all"
        );
        _;
        // _approve(to, tokenId);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        _requireMinted(tokenId);

        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public  {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address owne, address operator) internal view  returns (bool) {
        return _operatorApprovals[owne][operator];

    }

    // function transferFrom(address from,address to,uint256 tokenId) public  {

    //   require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: caller is not token owner or approved");

    //    _transfer(from, to, tokenId);
    // }

    //function safeTransferFrom (address from,address to,uint256 tokenId) public  {
    //  safeTransferFrom(from, to, tokenId, "");
    //}

    //function safeTransferFrom (address from,address to,uint256 tokenId, bytes memory data) public{
    //  safeTransferFrom(from, to, tokenId, data);
    //}

    //_safeTransfer(from, to, tokenId, data)

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId].owner != address(0);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owne = ownerOf(tokenId);
        return (spender == owne || isApprovedForAll(owne, spender) || getApproved(tokenId) == spender);
    }

    //_safeMint(to, tokenId)

    //_safeMint(to, tokenId, data)

    //  function addplayer (address to, string calldata nams,  string calldata region)  external {
    //  newPlayer =  player( nams,  region, to);

    //}

    function _mint(address to, uint256 tokenId, string memory namsis) external {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        //   _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId].owner = to;
        //s = namsis;
        _owners[tokenId].URI = namsis;


        emit Transfer(address(0), to, tokenId);

        //_afterTokenTransfer(address(0), to, tokenId);
    }

    function _burn(uint256 tokenId) internal  {
        address owne = ownerOf(tokenId);

        // _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        //delete _tokenApprovals[tokenId];

        _balances[owne] -= 1;
        //delete _owners[tokenId];

        emit Transfer(owne, address(0), tokenId);

        // _afterTokenTransfer(owner, address(0), tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId ) internal {
        require(ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");

        //_beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        //delete _tokenApprovals[tokenId];

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId].owner = to;

        emit Transfer(from, to, tokenId);

        //_afterTokenTransfer(from, to, tokenId);
    }

    function _approve(address to, uint256 tokenId) approve (to, tokenId) internal  {
        _tokenApprovals[tokenId] = to;
        emit Approval(ownerOf(tokenId), to, tokenId);
    }

    function _setApprovalForAll(address owne,address operator, bool approved ) internal {
        require(owne != operator, "ERC721: approve to caller");
        _operatorApprovals[owne][operator] = approved;
        //emit ApprovalForAll(ownerOf(tokenId), operator, approved);
    }

    function _requireMinted(uint256 tokenId) internal view virtual {
        require(_exists(tokenId),"Error");
    }
}