// 1. 构建虚拟DOM
var tree = createElement('div', {'id': 'container'}, [
    createElement('h1', {style: 'color: blue'}, ['simple virtal dom']),
    createElement('p', ['Hello, virtual-dom']),
    createElement('ul', [createElement('li')])
])

// 2. 通过虚拟DOM构建真正的DOM
var root = tree.render()
document.body.appendChild(root)

// 3. 生成新的虚拟DOM
var newTree = createElement('div', {'id': 'container'}, [
    createElement('h1', {style: 'color: red'}, ['simple virtal dom']),
    createElement('p', ['Hello, virtual-dom']),
    createElement('ul', [createElement('li'), createElement('li')])
])

// 4. 比较两棵虚拟DOM树的不同
var patchMap = diff(tree, newTree)

// 5. 在真正的DOM元素上应用变更
patch(root, patchMap)


const TEXT = 0
const PROPS = 1
const REPLACE = 2

function patch(realNode, patchMap) {
	dfsPatch(realNode, patchMap, 0)
}

function dfsPatch(realNode, patchMap, index) {
	var patches, child
	patches = patchMap[index]
	for (child of realNode.childNodes) {
		index++
		dfsPatch(child, patchMap, index)
	}
	applyPatches(realNode, patches)
}

function applyPatches(realNode, patches) {
	for (var patch of patches) {
		switch (patch.type) {
			case TEXT:
				realNode.textContent = patch.textContent
				return
			case PROPS:
				for (var key of patch.props) {
					realNode.setAttribute(key, patch.props[key])
				}
				return
			case REPLACE:
				realNode.parentNode.replaceChild(patch.newNode.render(), realNode)
				return
			case REORDER:
				return
			default:
				throw new Error('unknown patch type: ' + patch.type)
		}
	}
}

function diff(oldNode, newNode) {
	var patchMap = {}
	var index = 0
	dfsDiff(oldNode, newNode, index, patchMap)
}

function dfsDiff(oldNode, newNode, index, patchMap) {
	var patches = [], patchProps

	if (newNode === null)
		return

	if (typeof newNode === 'string' && typeof oldNode === 'string') {
		if (newNode !== oldNode) {
			patches.push({
				type: TEXT,
				textContent: newNode
			})
		}
	} else if (newNode.tagName === oldNode.tagName && newNode.key === oldNode.key) {
		patchProps = diffProps(oldNode.props, newNode.props)
		if (patchProps) {
			patches.push({
				type: PROPS,
				props: patchProps
			})
		}
		diffChildren(oldNode.children, newNode.children, index, patchMap)
	} else {
		patches.push({
			type: REPLACE,
			node: newNode
		})
	}

	if (patches.length) {
		patchMap[index] = patches
	}
}

function diffChildren(oldChildren, newChildren, index, patches) {
	var leftNode, oldChild, newChild
	for (var i = 0; i < oldChildren.length;  i++) {
		oldChild = oldChildren[i]
		newChild = newChildren[i]
		index = (leftNode && leftNode.count) ? index + leftNode.count + 1 : index + 1
		dfsDiff(oldChild, newChild, index, patches)
		leftNode = oldChild
	}
}

function diffProps(oldProps, newProps) {
	var newProp, newValue, patchProps, sign = false

	for (newProp in newProps) {
		newValue = newProps[newProp]
		if (oldProps.hasOwnProperty(newProp)) {
			if (oldProps[newProp] !== newValue) {
				sign = true
				patchProps[newProp] = newValue
			}
		} else {
			sign = true
			patchProps[newProp] = newValue
		}
	}

	return sign && patchProps
}

function createElement(tagName, props, children) {
	return new Element(tagName, props, children)
}

function Element(tagName, props, children) {
	Object.assign({
		tagName,
		props,
		children
	})
}

Element.prototype.render = function() {
	const { type, props, children } = this
	var el = document.createElement(type)
	for (var key in props) {
		if (props.hasOwnProperty(key)) {
			el.setAttribute(key, props[key])
		}
	}
	for (var child of children) {
		el.appendChild(
			child instanceof Element ? child.render() : document.createTextNode(child)
		)
	}
	return el
}
