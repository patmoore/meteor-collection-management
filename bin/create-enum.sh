#!/bin/sh
if [ $# = 0 ] ; then 
    cat <<HELP
$0 EnumName
HELP
    exit 1
fi
varName=$1
fileName=$varName.js
javascriptTypeName="$(tr '[:upper:]' '[:lower:]' <<< ${varName:0:1})${varName:1}"
commonDir=${2:-./imports/startup/collections}
mkdir -p $commonDir

cat <<EOM >>$commonDir/${fileName}
export default ${varName} = new Enums.Enum({
    typeName: '${javascriptTypeName}',
    defs:[{
    }],
});
EOM
echo "Created $commonDir/${fileName}"
