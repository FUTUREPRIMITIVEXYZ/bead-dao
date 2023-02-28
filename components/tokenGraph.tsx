import React, { useEffect, useMemo } from "react";

import { Network, Alchemy } from "alchemy-sdk";
import useSWR from "swr";
import ELK from "elkjs";
import ReactFlow, {
  Background,
  NodeProps,
  Handle,
  Position,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import useTokenBoundAccount from "../utils/hooks/useTokenBoundAccount";
import useTokenBoundGraph from "../utils/hooks/useTokenBoundGraph";
import { Badge } from "./badge";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

const TokenNode: React.FC<NodeProps> = ({ data }) => {
  const { data: tokenData } = useSWR(
    `${data.tokenContract}/${data.tokenId}/metadata`,
    async () =>
      await alchemy.nft.getNftMetadata(data.tokenContract, data.tokenId, {
        refreshCache: true,
      })
  );

  // @ts-ignore next-line
  const type = tokenData?.tokenType;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="invisible"
        isConnectable={true}
      />
      <div className="w-48 bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        {type && type === "ERC1155" && (
          <Badge className={`absolute top-2 z-10 left-2`}>
            <span className="font-bold text-white">{`ERC 1155`}</span>
          </Badge>
        )}

        {/* eslint-disable */}
        {type && type === "ERC1155" ? (
          <img
            className="h-48 w-48 cursor-not-allowed"
            src={tokenData?.media?.[0]?.gateway}
          />
        ) : (
          <a
            href={data?.account ? `/account/${data?.account}` : ""}
            target="_blank"
            rel="noreferrer"
          >
            {/* eslint-disable */}
            <img className="h-48 w-48" src={tokenData?.media?.[0]?.gateway} />
          </a>
        )}
        <div className="p-2 pb-1 font-semibold">{tokenData?.title}</div>
        {data?.account && (
          <div className="p-2 pt-0">
            {type === "ERC1155" ? (
              <div className="inline-block bg-gray-100 text-gray-500 py-1 px-2 rounded-full text-sm">
                N/A
              </div>
            ) : (
              <a
                href={
                  data?.account
                    ? `https://goerli.etherscan.io/address/${data?.account}`
                    : ""
                }
                target="_blank"
                rel="noreferrer"
                className="bg-gray-100 text-gray-500 py-1 px-2 rounded-full text-sm"
              >{`${data?.account.substr(0, 6)}...${data?.account.substr(
                data?.account?.length - 4,
                data?.account?.length
              )}`}</a>
            )}
          </div>
        )}
        {data?.loading === true && (
          <div className="p-2 pt-0">
            <span className="animate-pulse bg-gray-100 text-gray-500 py-1 px-2 rounded-full text-sm">
              loading...
            </span>
          </div>
        )}
      </div>
      {tokenData?.tokenType === "ERC721" && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="invisible"
          isConnectable={true}
        />
      )}
    </>
  );
};

const TokenGraph = ({
  tokenContract,
  tokenId,
}: {
  tokenContract: string;
  tokenId: string;
}) => {
  const reactFlowInstance = useReactFlow();
  const nodeTypes = useMemo(() => ({ token: TokenNode }), []);

  const { data: tokenboundAccountData } = useTokenBoundAccount({
    tokenContract,
    tokenId,
  });

  const { data: tokenGraph } = useTokenBoundGraph({
    address: tokenboundAccountData?.account,
  });

  const [nodes, setNodes, onNodesChange] = useNodesState<any>([
    {
      id: "1",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        tokenContract,
        tokenId,
        loading: true,
      },
      type: "token",
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (tokenboundAccountData?.account && tokenGraph) {
      const elk = new ELK();

      tokenGraph.mergeNode(tokenboundAccountData.account, {
        tokenContract,
        tokenId,
        tokenType: "ERC721",
      });

      const nodes = tokenGraph.mapNodes((node, attributes) => {
        const { x, y, ...nodeData } = attributes;
        nodeData.account = node;
        return {
          id: node,
          type: "token",
          data: nodeData,
        };
      });

      const edges = tokenGraph.mapEdges((edge, _attributes, source, target) => {
        return {
          id: edge,
          type: ConnectionLineType.SmoothStep,
          source,
          target,
        };
      });

      const elkNodes = nodes.map((node) => ({
        ...node,
        width: 230,
        height: 320,
      }));
      const elkEdges = edges.map((edge) => ({
        ...edge,
        sources: [edge.source],
        targets: [edge.target],
      }));

      elk
        .layout({
          id: "root",
          layoutOptions: { "elk.algorithm": "mrtree" },
          children: elkNodes,
          edges: elkEdges,
        })
        .then((result) => {
          const positionedNodes = result.children?.map((child, index) => ({
            id: child.id,
            data: nodes[index].data,
            type: nodes[index].type,
            position: {
              x: child.x!,
              y: child.y!,
            },
          }));

          if (positionedNodes) {
            setNodes(positionedNodes);
            setEdges(edges);
            setTimeout(() => {
              reactFlowInstance.fitView({ padding: 0.5 });
            }, 100);
          }
        });
    }
  }, [tokenGraph, tokenboundAccountData]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      // nodeTypes={nodeTypes}
      fitView
      // onConnect={onConnect}
    >
      <Background className="bg-gray-100" />
    </ReactFlow>
  );
};

export default TokenGraph;
