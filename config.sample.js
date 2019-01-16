// custom scripts

module.exports = {
  path: "/build",
  secret: "wh.rat.red",
  hooks: [
    {
      repository: "docs",
      shell: "ratRedUpdate",
      lockBranch: "master"
    },
    {
      repository: "private_docs",
      shell: "docsRatRedUpdate",
      lockBranch: "master"
    }
  ]
}
